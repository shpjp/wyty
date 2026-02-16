"use client"

import { useState, useEffect } from "react"
import { FaChartLine, FaProjectDiagram, FaArrowRight, FaArrowLeft, FaFilter, FaCheckCircle, FaSearch, FaInfoCircle } from "react-icons/fa"

type Problem = {
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
  tags: string[]
}

type ProblemSelectorProps = {
  onSelectProblem: (problem: Problem) => void
  attemptsRemaining: number
}

export default function ProblemSelector({ onSelectProblem, attemptsRemaining }: ProblemSelectorProps) {
  const [problems, setProblems] = useState<Problem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<"DYNAMIC_PROGRAMMING" | "GRAPH" | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [showConstraints, setShowConstraints] = useState<string | null>(null)

  useEffect(() => {
    if (selectedCategory) {
      fetchProblems()
    }
  }, [selectedCategory])

  const fetchProblems = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/problems?category=${selectedCategory}`)
      if (res.ok) {
        const data = await res.json()
        setProblems(data)
      }
    } catch (error) {
      console.error("Failed to fetch problems:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProblems = selectedDifficulty
    ? problems.filter((p) => p.difficulty === selectedDifficulty)
    : problems

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "bg-green-500/10 text-green-400 border-green-500/30"
      case "MEDIUM":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
      case "HARD":
        return "bg-red-500/10 text-red-400 border-red-500/30"
      default:
        return "bg-gray-800/50 text-gray-300 border-gray-700/50"
    }
  }

  const CategoryIcon = ({ category }: { category: string }) => {
    return category === "DYNAMIC_PROGRAMMING" ? (
      <FaChartLine className="w-12 h-12" />
    ) : (
      <FaProjectDiagram className="w-12 h-12" />
    )
  }

  if (!selectedCategory) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="max-w-4xl w-full px-4">
          <div className="text-center mb-16">
            <h1 className="text-7xl font-bold text-white mb-4 tracking-tight">
              wyt?
            </h1>
            <p className="text-2xl text-gray-500 font-light">
              what's your type?
            </p>
            <p className="text-lg text-gray-600 mt-2">
              Discover your coding speed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dynamic Programming Card */}
            <button
              onClick={() => setSelectedCategory("DYNAMIC_PROGRAMMING")}
              className="group bg-[#1a1a1a]/50 backdrop-blur-sm border border-gray-800/50 hover:border-yellow-500/50 rounded-xl p-10 transition-all duration-300 text-left hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
                <FaChartLine className="w-14 h-14" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Dynamic Programming
              </h2>
              <p className="text-gray-400 text-base mb-6">
                Master DP patterns and optimize your problem-solving skills
              </p>
              <div className="flex items-center space-x-2 text-sm font-semibold text-yellow-500 group-hover:translate-x-2 transition-transform">
                <span>Start Typing</span>
                <FaArrowRight className="w-4 h-4" />
              </div>
            </button>

            {/* Graph Card */}
            <button
              onClick={() => setSelectedCategory("GRAPH")}
              className="group bg-[#1a1a1a]/50 backdrop-blur-sm border border-gray-800/50 hover:border-yellow-500/50 rounded-xl p-10 transition-all duration-300 text-left hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
                <FaProjectDiagram className="w-14 h-14" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Graph Algorithms
              </h2>
              <p className="text-gray-400 text-base mb-6">
                Traverse through complex graph problems and ace interviews
              </p>
              <div className="flex items-center space-x-2 text-sm font-semibold text-yellow-500 group-hover:translate-x-2 transition-transform">
                <span>Start Typing</span>
                <FaArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              setSelectedCategory(null)
              setSelectedDifficulty(null)
              setProblems([])
            }}
            className="flex items-center space-x-2 text-gray-400 hover:text-yellow-500 transition-all group"
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-yellow-500">
              <CategoryIcon category={selectedCategory} />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {selectedCategory === "DYNAMIC_PROGRAMMING" ? "Dynamic Programming" : "Graph Algorithms"}
            </h2>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center justify-center space-x-3 flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <FaFilter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-500">Difficulty:</span>
          </div>
          <button
            onClick={() => setSelectedDifficulty(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedDifficulty === null
                ? "bg-yellow-500 text-black"
                : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50"
            }`}
          >
            All
          </button>
          {["EASY", "MEDIUM", "HARD"].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedDifficulty === diff
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Problems List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      ) : filteredProblems.length > 0 ? (
        <div className="grid gap-4">
          {filteredProblems.map((problem, index) => (
            <button
              key={problem.id}
              onClick={() => {
                if (attemptsRemaining <= 0) {
                  alert('Daily attempt limit reached! You have used all 3 attempts for today. Please come back tomorrow.');
                  return;
                }
                onSelectProblem(problem);
              }}
              className="group bg-[#1a1a1a]/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 hover:border-yellow-500/50 transition-all duration-200 hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Problem Number */}
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 text-black rounded-lg flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>

                  {/* Problem Info */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-500 transition-colors">
                        {problem.title}
                      </h3>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowConstraints(showConstraints === problem.id ? null : problem.id);
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowConstraints(showConstraints === problem.id ? null : problem.id);
                          }
                        }}
                        className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 flex items-center justify-center text-gray-500 hover:text-yellow-500 transition-all cursor-pointer"
                        title="View constraints"
                        aria-label="View constraints"
                      >
                        <FaInfoCircle className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    {/* Constraints */}
                    {showConstraints === problem.id && problem.constraints && (
                      <div className="mt-3 p-4 bg-gray-900/50 border border-gray-800/50 rounded-lg text-sm text-gray-300">
                        <div className="font-semibold text-yellow-500 mb-2">Constraints:</div>
                        <ul className="space-y-1">
                          {problem.constraints.map((constraint, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2 text-yellow-500">•</span>
                              <span>{constraint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Tags */}
                    {problem.tags && problem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {problem.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-xs font-medium bg-gray-800/50 text-gray-400 rounded-lg border border-gray-700/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Difficulty Badge */}
                  <div className={`px-4 py-1.5 rounded-lg border text-sm font-semibold ${
                    getDifficultyColor(problem.difficulty)
                  }`}>
                    {problem.difficulty}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0">
                  <FaArrowRight className="w-6 h-6 text-gray-600 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-xl text-gray-400">
            No problems found for this filter
          </p>
        </div>
      )}
    </div>
  )
}
