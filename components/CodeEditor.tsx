"use client"

import { useState, useEffect, useRef } from "react"
import { FaClock, FaBolt, FaCheckCircle, FaExclamationTriangle, FaRedo, FaInfoCircle, FaTrophy } from "react-icons/fa"

type CodeEditorProps = {
  problem: {
    id: string
    title: string
    description: string
    solution: string
    category: string
    difficulty: string
  }
  isAuthenticated: boolean
  onComplete: (stats: {
    wpm: number
    accuracy: number
    timeSpent: number
  }) => void
}

type TimeMode = 60 | 120

export default function CodeEditor({
  problem,
  isAuthenticated,
  onComplete,
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
  
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
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
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const startTyping = (mode: TimeMode) => {
    setTimeMode(mode)
    setTimeRemaining(mode)
    setIsStarted(true)
    setStartTime(Date.now())
    inputRef.current?.focus()
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

    const targetChar = normalizedSolution[currentIndex]

    if (e.key === 'Enter') {
      e.preventDefault()
      
      if (targetChar === '\n') {
        setUserInput(prev => prev + '\n')
        setCurrentIndex(prev => prev + 1)
        setCorrectChars(prev => prev + 1)
        
        if (currentIndex + 1 >= normalizedSolution.length) {
          setIsCompleted(true)
          if (timerRef.current) clearInterval(timerRef.current)
          calculateFinalStats()
        }
      } else {
        setErrors(prev => prev + 1)
      }
      return
    }

    if (e.key === 'Backspace') {
      e.preventDefault()
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
    const newChar = value[value.length - 1]
    const targetChar = normalizedSolution[currentIndex]

    if (newChar === targetChar) {
      setUserInput(value)
      setCurrentIndex(prev => prev + 1)
      setCorrectChars(prev => prev + 1)

      if (currentIndex + 1 >= normalizedSolution.length) {
        setIsCompleted(true)
        if (timerRef.current) clearInterval(timerRef.current)
        calculateFinalStats()
      }
    } else {
      setErrors(prev => prev + 1)
    }
  }

  const getDisplayText = () => {
    return normalizedSolution.split('').map((char, index) => {
      let className = "transition-colors"
      
      if (index < currentIndex) {
        className += " text-green-500"
      } else if (index === currentIndex) {
        className += " bg-yellow-300 dark:bg-yellow-600 text-black"
      } else {
        className += " text-gray-400 dark:text-gray-500"
      }

      return (
        <span key={index} className={className}>
          {char === '\n' ? '↵\n' : char}
        </span>
      )
    })
  }

  if (!isStarted) {
    return (
      <div className="space-y-6">
        {/* Problem Header */}
        <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 dark:from-cyan-700 dark:via-blue-700 dark:to-indigo-800 rounded-xl p-8 shadow-2xl text-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-4">{problem.title}</h2>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-4 py-2 rounded-lg text-sm font-bold border-2 shadow-md ${
                    problem.difficulty === "EASY"
                      ? "bg-emerald-500 border-emerald-300 text-white"
                      : problem.difficulty === "MEDIUM"
                      ? "bg-amber-500 border-amber-300 text-white"
                      : "bg-rose-500 border-rose-300 text-white"
                  }`}
                >
                  {problem.difficulty}
                </span>
                <span className="px-4 py-2 rounded-lg text-sm font-bold bg-white/20 backdrop-blur border-2 border-white/30">
                  {problem.category === "DYNAMIC_PROGRAMMING" ? "Dynamic Programming" : "Graph Algorithms"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Description */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900 rounded-lg flex items-center justify-center">
              <FaInfoCircle className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Problem Description</h3>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {problem.description}
            </p>
          </div>
        </div>

        {/* Time Mode Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-full mb-4">
              <FaClock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Select Time Mode</h3>
            <p className="text-gray-600 dark:text-gray-400">Choose your challenge duration</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <button
              onClick={() => startTyping(60)}
              className="group relative bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100 dark:from-cyan-950 dark:via-blue-950 dark:to-cyan-900 
                         border-3 border-cyan-300 dark:border-cyan-600 rounded-xl p-8 
                         hover:shadow-xl hover:scale-105 transition-all duration-300
                         focus:outline-none focus:ring-4 focus:ring-cyan-300"
            >
              <div className="text-5xl font-black text-cyan-600 dark:text-cyan-400 mb-2">60</div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">seconds</div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaBolt className="w-4 h-4 text-white" />
              </div>
            </button>

            <button
              onClick={() => startTyping(120)}
              className="group relative bg-gradient-to-br from-violet-50 via-purple-50 to-violet-100 dark:from-violet-950 dark:via-purple-950 dark:to-violet-900 
                         border-3 border-violet-300 dark:border-violet-600 rounded-xl p-8 
                         hover:shadow-xl hover:scale-105 transition-all duration-300
                         focus:outline-none focus:ring-4 focus:ring-violet-300"
            >
              <div className="text-5xl font-black text-violet-600 dark:text-violet-400 mb-2">120</div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">seconds</div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaBolt className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Timer and Stats Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 dark:from-cyan-700 dark:via-blue-700 dark:to-indigo-800 rounded-xl p-6 shadow-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">{problem.title}</h3>
          <span className={`px-4 py-2 rounded-lg text-sm font-bold ${
            problem.difficulty === "EASY"
              ? "bg-emerald-500"
              : problem.difficulty === "MEDIUM"
              ? "bg-amber-500"
              : "bg-rose-500"
          }`}>
            {problem.difficulty}
          </span>
        </div>
      </div>

      {/* Stats Display */}
      {!isCompleted ? (
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 rounded-xl p-10 shadow-2xl border-4 border-cyan-500 dark:border-cyan-600">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-full mb-4 animate-pulse">
              <span className="text-5xl font-black text-white">{timeRemaining}</span>
            </div>
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">seconds remaining</div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-2">
              <FaClock className="w-4 h-4" />
              <span>Keep typing to complete the solution!</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100 dark:from-cyan-950 dark:via-blue-950 dark:to-cyan-900 
                          rounded-xl p-6 shadow-lg border-2 border-cyan-300 dark:border-cyan-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">WPM</span>
              <FaBolt className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="text-4xl font-black text-cyan-600 dark:text-cyan-400">{stats.wpm}</div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 dark:from-emerald-950 dark:via-green-950 dark:to-emerald-900 
                          rounded-xl p-6 shadow-lg border-2 border-emerald-300 dark:border-emerald-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Accuracy</span>
              <FaCheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400">{stats.accuracy}%</div>
          </div>
          
          <div className="bg-gradient-to-br from-rose-50 via-red-50 to-rose-100 dark:from-rose-950 dark:via-red-950 dark:to-rose-900 
                          rounded-xl p-6 shadow-lg border-2 border-rose-300 dark:border-rose-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-rose-700 dark:text-rose-300">Errors</span>
              <FaExclamationTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <div className="text-4xl font-black text-rose-600 dark:text-rose-400">{errors}</div>
          </div>
        </div>
      )}

      {/* Code Display */}
      <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-8 shadow-2xl border border-gray-700">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          </div>
          <span className="text-sm font-mono text-gray-400">solution.js</span>
        </div>
        <pre className="font-mono text-base leading-relaxed whitespace-pre-wrap overflow-x-auto">
          {getDisplayText()}
        </pre>
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
          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 
                     text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-slate-300"
        >
          <FaRedo className="w-4 h-4" />
          <span>Reset Practice</span>
        </button>
      </div>

      {/* Completion Message */}
      {isCompleted && (
        <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-100 dark:from-emerald-950 dark:via-green-950 dark:to-emerald-900 
                        border-2 border-emerald-400 dark:border-emerald-600 rounded-xl p-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center animate-bounce">
              <FaTrophy className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-2">
                {timeMode ? "Time's Up!" : "Congratulations!"}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">{stats.wpm} WPM</span> • 
                <span className="font-semibold"> {stats.accuracy}% accuracy</span> • 
                <span className="font-semibold"> {errors} errors</span>
              </p>
              {!isAuthenticated && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex items-center space-x-2">
                  <FaInfoCircle className="w-4 h-4" />
                  <span>Login to save your progress and track your improvement!</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
