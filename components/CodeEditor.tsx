"use client"

import { useState, useEffect, useRef } from "react"
import { FaClock, FaBolt, FaCheckCircle, FaExclamationTriangle, FaRedo, FaInfoCircle, FaTrophy } from "react-icons/fa"

type CodeEditorProps = {
  problem: {
    id: string
    title: string
    description: string
    solution: string
    leetcodeUrl: string
    category: string
    difficulty: string
  }
  isAuthenticated: boolean
  onComplete: (stats: {
    wpm: number
    accuracy: number
    timeSpent: number
  }) => void
  attemptsRemaining: number
}

type TimeMode = 60 | 120

export default function CodeEditor({
  problem,
  isAuthenticated,
  onComplete,
  attemptsRemaining,
}: CodeEditorProps) {
  const [userInput, setUserInput] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [timeMode, setTimeMode] = useState<TimeMode | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [errors, setErrors] = useState(0)
  const [correctChars, setCorrectChars] = useState(0)
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 0,
    timeSpent: 0,
  })
  const [isTyping, setIsTyping] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
  
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const typingAreaRef = useRef<HTMLDivElement>(null)
  
  // Normalize solution: remove leading tabs/spaces from each line
  const normalizedSolution = problem.solution
    .split('\n')
    .map(line => line.trimStart())
    .join('\n')

  useEffect(() => {
    // Reset on problem change
    resetTyping()
  }, [problem.id])

  useEffect(() => {
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout)
    }
  }, [typingTimeout])

  useEffect(() => {
    if (isStarted && timeMode && timeRemaining !== null) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 0) {
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isStarted, timeMode])

  const resetTyping = () => {
    setUserInput("")
    setCurrentIndex(0)
    setStartTime(null)
    setIsStarted(false)
    setIsCompleted(false)
    setCorrectChars(0)
    setErrors(0)
    setTimeRemaining(null)
    setStats({ wpm: 0, accuracy: 0, timeSpent: 0 })
    setIsTyping(false)
    if (timerRef.current) clearInterval(timerRef.current)
    if (typingTimeout) clearTimeout(typingTimeout)
  }

  const startTyping = (mode: TimeMode) => {
    if (isAuthenticated && attemptsRemaining <= 0) {
      alert('Daily attempt limit reached! You have used all 3 attempts for today. Please come back tomorrow.');
      return;
    }
    setTimeMode(mode)
    setTimeRemaining(mode)
    setIsStarted(true)
    setStartTime(Date.now())
    setCurrentIndex(0)
    setIsTyping(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const calculateFinalStats = () => {
    if (!timeMode) return

    const timeSpent = timeMode
    const wordsTyped = correctChars / 5
    const wpm = Math.floor((wordsTyped / timeSpent) * 60) || 0
    const totalAttempts = correctChars + errors
    const accuracy = totalAttempts > 0 ? Math.floor((correctChars / totalAttempts) * 100) : 100

    const finalStats = { wpm, accuracy, timeSpent }
    setStats(finalStats)
    
    if (isAuthenticated) {
      onComplete(finalStats)
    }
  }

  const handleTimeUp = () => {
    setIsCompleted(true)
    if (timerRef.current) clearInterval(timerRef.current)
    calculateFinalStats()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isStarted) return

    if (e.key === 'Backspace') {
      e.preventDefault()
      if (currentIndex > 0) {
        const prevChar = userInput[currentIndex - 1]
        const expectedChar = normalizedSolution[currentIndex - 1]
        
        // If we're removing a correct character, decrease correctChars
        if (prevChar === expectedChar) {
          setCorrectChars(prev => Math.max(0, prev - 1))
        }
        
        setUserInput(prev => prev.slice(0, -1))
        setCurrentIndex(prev => Math.max(0, prev - 1))
      }
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      return
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isStarted || isCompleted) return

    const value = e.target.value
    
    // Handle backspace case (value is shorter)
    if (value.length < userInput.length) {
      return // Backspace is handled in handleKeyDown
    }
    
    const newChar = value[value.length - 1]
    const targetChar = normalizedSolution[currentIndex]

    // Mark as typing (stops cursor blink)
    setIsTyping(true)
    if (typingTimeout) clearTimeout(typingTimeout)
    const timeout = setTimeout(() => setIsTyping(false), 500)
    setTypingTimeout(timeout)

    // Always progress, but track if correct or wrong
    setUserInput(value)
    setCurrentIndex(prev => prev + 1)
    
    if (newChar === targetChar) {
      setCorrectChars(prev => prev + 1)
    } else {
      setErrors(prev => prev + 1)
    }

    // Check completion
    if (currentIndex + 1 >= normalizedSolution.length) {
      setIsCompleted(true)
      if (timerRef.current) clearInterval(timerRef.current)
      calculateFinalStats()
    }
  }

  const getDisplayText = () => {
    const chars = normalizedSolution.split('')
    const elements: JSX.Element[] = []
    
    chars.forEach((char, index) => {
      let className = "char relative transition-colors duration-75"
      const typedChar = userInput[index]
      
      if (index < currentIndex) {
        // Already typed - check if correct or incorrect
        if (typedChar === char) {
          className += " text-green-400" // Correct
        } else {
          className += " text-red-400 bg-red-950/30" // Incorrect
        }
      } else if (index === currentIndex) {
        // Current character - show cursor
        className += " current text-gray-300"
      } else {
        // Untyped
        className += " text-gray-600"
      }

      if (char === '\n') {
        elements.push(
          <span key={index} className={className}>
            ↵
            {index === currentIndex && (
              <span 
                className={`cursor-blink ${isTyping ? 'cursor-active' : ''}`}
                aria-hidden="true"
              />
            )}
          </span>
        )
        elements.push(<br key={`br-${index}`} />)
      } else {
        elements.push(
          <span key={index} className={className}>
            {char === ' ' ? '\u00A0' : char}
            {index === currentIndex && (
              <span 
                className={`cursor-blink ${isTyping ? 'cursor-active' : ''}`}
                aria-hidden="true"
              />
            )}
          </span>
        )
      }
    })
    
    return elements
  }

  if (!isStarted) {
    return (
      <div className="space-y-6">
        {/* Problem Header */}
        <div className="bg-gray-950 border border-gray-800 rounded p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <a 
                href={problem.leetcodeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-3xl font-bold text-white hover:text-gray-300 transition-colors inline-flex items-center gap-2 group"
              >
                {problem.title}
                <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <div className="flex items-center space-x-3 mt-4">
                <span
                  className={`px-3 py-1 rounded text-sm font-bold border ${
                    problem.difficulty === "EASY"
                      ? "bg-gray-800 border-gray-700 text-gray-200"
                      : problem.difficulty === "MEDIUM"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-gray-600 border-gray-500 text-white"
                  }`}
                >
                  {problem.difficulty}
                </span>
                <span className="px-3 py-1 rounded text-sm font-medium bg-gray-900 text-gray-300 border border-gray-800">
                  {problem.category === "DYNAMIC_PROGRAMMING" ? "Dynamic Programming" : "Graph Algorithms"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Time Mode Selection */}
        <div className="bg-gray-950 border border-gray-800 rounded p-8">
          <div className="text-center mb-8">
            <h3 className="text-5xl font-bold text-white mb-2">Find Your Type</h3>
            <p className="text-xl text-gray-400">What's your type? Choose your duration.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <button
              onClick={() => startTyping(60)}
              className="group bg-black border-2 border-gray-800 hover:border-white rounded p-8 transition-all duration-300"
            >
              <div className="text-6xl font-black text-white mb-2">60</div>
              <div className="text-lg font-medium text-gray-400 group-hover:text-white transition-colors">seconds</div>
            </button>

            <button
              onClick={() => startTyping(120)}
              className="group bg-black border-2 border-gray-800 hover:border-white rounded p-8 transition-all duration-300"
            >
              <div className="text-6xl font-black text-white mb-2">120</div>
              <div className="text-lg font-medium text-gray-400 group-hover:text-white transition-colors">seconds</div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Compact Header with Timer */}
      <div className="bg-gray-950 border border-gray-800 rounded p-4">
        <div className="flex items-center justify-between">
          <a 
            href={problem.leetcodeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl font-bold text-white hover:text-gray-300 transition-colors inline-flex items-center gap-2 group"
          >
            {problem.title}
            <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded text-xs font-bold border ${
              problem.difficulty === "EASY"
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : problem.difficulty === "MEDIUM"
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-gray-600 border-gray-500 text-white"
            }`}>
              {problem.difficulty}
            </span>
            
            {/* Compact Timer */}
            {!isCompleted && (
              <div className="flex items-center space-x-2 bg-black border border-gray-800 px-4 py-2 rounded">
                <FaClock className="w-3 h-3 text-gray-400" />
                <span className="text-lg font-bold text-white">{timeRemaining}s</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Display */}
      {isCompleted && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-950 rounded p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-400">WPM</span>
              <FaBolt className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-4xl font-black text-white">{stats.wpm}</div>
          </div>
          
          <div className="bg-gray-950 rounded p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-400">Accuracy</span>
              <FaCheckCircle className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-4xl font-black text-white">{stats.accuracy}%</div>
          </div>
          
          <div className="bg-gray-950 rounded p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-400">Errors</span>
              <FaExclamationTriangle className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-4xl font-black text-white">{errors}</div>
          </div>
        </div>
      )}

      {/* Code Display */}
      <div 
        ref={typingAreaRef}
        onClick={() => inputRef.current?.focus()}
        className="bg-black rounded border border-gray-800 p-6 cursor-text transition-shadow hover:shadow-lg hover:shadow-white/5"
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          </div>
          <span className="text-sm font-mono text-gray-500">solution.js</span>
        </div>
        <div className="font-mono text-base leading-relaxed whitespace-pre-wrap overflow-x-auto select-none">
          {getDisplayText()}
        </div>
      </div>

      {/* Hidden Input */}
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className="absolute opacity-0 pointer-events-none"
        autoFocus
        aria-label="Code input"
      />

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={resetTyping}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-950 hover:bg-white hover:text-black border border-gray-800 hover:border-white 
                     text-white rounded font-medium transition-all duration-200"
        >
          <FaRedo className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Completion Message */}
      {isCompleted && (
        <div className="bg-gray-950 border-2 border-white rounded p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
            <FaTrophy className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">
            Congrats! Your type is...
          </h2>
          <div className="text-7xl font-black text-white mb-4">
            {stats.wpm} WPM
          </div>
          <p className="text-xl text-gray-400">
            {stats.wpm >= 80
              ? "Lightning fast! You're a coding machine."
              : stats.wpm >= 60
              ? "Impressive speed! Keep pushing your limits."
              : stats.wpm >= 40
              ? "Solid typing! Practice makes perfect."
              : "Good start! Keep practicing to improve your type."}
          </p>
          <div className="mt-6 pt-6 border-t border-gray-800 flex items-center justify-center space-x-6 text-gray-400">
            <div>
              <span className="text-sm">Accuracy</span>
              <span className="block text-2xl font-bold text-white">{stats.accuracy}%</span>
            </div>
            <div className="w-px h-12 bg-gray-800"></div>
            <div>
              <span className="text-sm">Errors</span>
              <span className="block text-2xl font-bold text-white">{errors}</span>
            </div>
          </div>
          {!isAuthenticated && (
            <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
              <FaInfoCircle className="w-4 h-4" />
              <span>Login to track your type and see improvements!</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
