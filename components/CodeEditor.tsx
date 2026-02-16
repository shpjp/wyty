"use client"

import { useState, useEffect, useRef } from "react"
import { FaClock, FaBolt, FaCheckCircle, FaExclamationTriangle, FaRedo, FaInfoCircle, FaTrophy } from "react-icons/fa"

type CodeEditorProps = {
  problem: {
    id: string
    title: string
    description: string
    solutionRecursion: string
    solutionMemoization: string
    solutionTabulation: string
    solutionSpaceOptimized: string
    constraints: string[]
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
  const [selectedSolution, setSelectedSolution] = useState<'recursion' | 'memoization' | 'tabulation' | 'spaceOptimized'>('recursion')
  
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const typingAreaRef = useRef<HTMLDivElement>(null)
  
  // Get current solution based on selection
  const getCurrentSolution = () => {
    switch (selectedSolution) {
      case 'recursion':
        return problem.solutionRecursion
      case 'memoization':
        return problem.solutionMemoization
      case 'tabulation':
        return problem.solutionTabulation
      case 'spaceOptimized':
        return problem.solutionSpaceOptimized
    }
  }
  
  // Normalize solution: remove leading tabs/spaces from each line
  const normalizedSolution = getCurrentSolution()
    .split('\n')
    .map(line => line.trimStart())
    .join('\n')

  useEffect(() => {
    // Reset on problem change or solution change
    resetTyping()
  }, [problem.id, selectedSolution])

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
    const elements: React.ReactElement[] = []
    
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
        <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <a 
                href={problem.leetcodeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-3xl font-bold text-white hover:text-yellow-500 transition-colors inline-flex items-center gap-2 group"
              >
                {problem.title}
                <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <div className="flex items-center space-x-3 mt-4">
                <span
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold border ${
                    problem.difficulty === "EASY"
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : problem.difficulty === "MEDIUM"
                      ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}
                >
                  {problem.difficulty}
                </span>
                <span className="px-4 py-1.5 rounded-lg text-sm font-medium bg-gray-800/50 text-gray-300 border border-gray-700/50">
                  {problem.category === "DYNAMIC_PROGRAMMING" ? "Dynamic Programming" : "Graph Algorithms"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Selector */}
        <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Choose Solution Approach</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setSelectedSolution('recursion')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                selectedSolution === 'recursion'
                  ? 'bg-yellow-500 text-black border-2 border-yellow-500'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600/50'
              }`}
            >
              Recursion
            </button>
            <button
              onClick={() => setSelectedSolution('memoization')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                selectedSolution === 'memoization'
                  ? 'bg-yellow-500 text-black border-2 border-yellow-500'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600/50'
              }`}
            >
              Memoization
            </button>
            <button
              onClick={() => setSelectedSolution('tabulation')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                selectedSolution === 'tabulation'
                  ? 'bg-yellow-500 text-black border-2 border-yellow-500'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600/50'
              }`}
            >
              Tabulation
            </button>
            <button
              onClick={() => setSelectedSolution('spaceOptimized')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                selectedSolution === 'spaceOptimized'
                  ? 'bg-yellow-500 text-black border-2 border-yellow-500'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600/50'
              }`}
            >
              Space Optimized
            </button>
          </div>
        </div>

        {/* Time Mode Selection */}
        <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-12">
          <div className="text-center mb-10">
            <h3 className="text-6xl font-bold text-white mb-3">ready?</h3>
            <p className="text-xl text-gray-500">Choose your duration</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <button
              onClick={() => startTyping(60)}
              className="group bg-[#0a0a0a]/80 border-2 border-gray-800/50 hover:border-yellow-500 rounded-xl p-10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10"
            >
              <div className="text-7xl font-black text-white group-hover:text-yellow-500 mb-3 transition-colors">60</div>
              <div className="text-lg font-medium text-gray-500 group-hover:text-gray-300 transition-colors">seconds</div>
            </button>

            <button
              onClick={() => startTyping(120)}
              className="group bg-[#0a0a0a]/80 border-2 border-gray-800/50 hover:border-yellow-500 rounded-xl p-10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10"
            >
              <div className="text-7xl font-black text-white group-hover:text-yellow-500 mb-3 transition-colors">120</div>
              <div className="text-lg font-medium text-gray-500 group-hover:text-gray-300 transition-colors">seconds</div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Compact Header with Timer */}
      <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <a 
            href={problem.leetcodeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl font-bold text-white hover:text-yellow-500 transition-colors inline-flex items-center gap-2 group"
          >
            {problem.title}
            <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          <div className="flex items-center space-x-4">
            <span className={`px-4 py-1.5 rounded-lg text-xs font-bold border ${
              problem.difficulty === "EASY"
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : problem.difficulty === "MEDIUM"
                ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}>
              {problem.difficulty}
            </span>
            
            {/* Compact Timer */}
            {!isCompleted && (
              <div className="flex items-center space-x-2 bg-[#0a0a0a]/80 border border-gray-800/50 px-4 py-2 rounded-lg">
                <FaClock className="w-3 h-3 text-yellow-500" />
                <span className="text-lg font-bold text-white">{timeRemaining}s</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Display */}
      {isCompleted && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a]/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">WPM</span>
              <FaBolt className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="text-4xl font-black text-white">{stats.wpm}</div>
          </div>
          
          <div className="bg-[#1a1a1a]/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Accuracy</span>
              <FaCheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-4xl font-black text-white">{stats.accuracy}%</div>
          </div>
          
          <div className="bg-[#1a1a1a]/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Errors</span>
              <FaExclamationTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-4xl font-black text-white">{errors}</div>
          </div>
        </div>
      )}

      {/* Code Display */}
      <div 
        ref={typingAreaRef}
        onClick={() => inputRef.current?.focus()}
        className="bg-[#0a0a0a]/90 rounded-xl border border-gray-800/50 p-6 cursor-text transition-all hover:border-yellow-500/30"
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800/50">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs px-3 py-1 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-400">
              {selectedSolution === 'recursion' ? 'Recursion' :
               selectedSolution === 'memoization' ? 'Memoization' :
               selectedSolution === 'tabulation' ? 'Tabulation' :
               'Space Optimized'}
            </span>
            <span className="text-sm font-mono text-gray-600">solution.cpp</span>
          </div>
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
          className="flex items-center space-x-2 px-6 py-3 bg-[#1a1a1a]/50 backdrop-blur-sm hover:bg-yellow-500 hover:text-black border border-gray-800/50 hover:border-yellow-500 
                     text-white rounded-lg font-medium transition-all duration-200"
        >
          <FaRedo className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Completion Message */}
      {isCompleted && (
        <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border-2 border-yellow-500/50 rounded-xl p-10 text-center shadow-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 rounded-full mb-6">
            <FaTrophy className="w-10 h-10 text-black" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">
            Your type is...
          </h2>
          <div className="text-8xl font-black text-yellow-500 mb-6">
            {stats.wpm} WPM
          </div>
          <p className="text-xl text-gray-400">
            {stats.wpm >= 80
              ? "Lightning fast! You're a coding machine ⚡"
              : stats.wpm >= 60
              ? "Impressive speed! Keep pushing your limits 🚀"
              : stats.wpm >= 40
              ? "Solid typing! Practice makes perfect 💪"
              : "Good start! Keep practicing to improve 📈"}
          </p>
          <div className="mt-8 pt-8 border-t border-gray-800/50 flex items-center justify-center space-x-8 text-gray-400">
            <div>
              <span className="text-sm uppercase tracking-wide text-gray-500">Accuracy</span>
              <span className="block text-3xl font-bold text-white">{stats.accuracy}%</span>
            </div>
            <div className="w-px h-16 bg-gray-800/50"></div>
            <div>
              <span className="text-sm uppercase tracking-wide text-gray-500">Errors</span>
              <span className="block text-3xl font-bold text-white">{errors}</span>
            </div>
          </div>
          {!isAuthenticated && (
            <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-500 bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
              <FaInfoCircle className="w-4 h-4 text-yellow-500" />
              <span>Login to track your progress and see improvements over time!</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
