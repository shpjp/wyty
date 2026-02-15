"use client"

import { useState, useEffect } from "react"
import { FaChartLine, FaProjectDiagram, FaArrowRight, FaArrowLeft, FaFilter, FaCheckCircle, FaSearch } from "react-icons/fa"

type Problem = {
  id: string
  title: string
  description: string
  solution: string
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
        return "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-700"
      case "MEDIUM":
        return "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700"
      case "HARD":
        return "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-700"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
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
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Challenge
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Select a category to start practicing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dynamic Programming Card */}
            <button
              onClick={() => setSelectedCategory("DYNAMIC_PROGRAMMING")}
              className="group relative bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 dark:from-cyan-950 dark:via-blue-950 dark:to-indigo-900 
                         border-2 border-cyan-200 dark:border-cyan-700 rounded-2xl p-8 
                         hover:shadow-2xl hover:scale-105 transition-all duration-300
                         focus:outline-none focus:ring-4 focus:ring-cyan-300"
            >
              <div className="text-cyan-600 dark:text-cyan-400 mb-4 flex justify-center">
                <FaChartLine className="w-16 h-16" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Dynamic Programming
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Master DP patterns and optimize your problem-solving skills
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm font-medium text-cyan-600 dark:text-cyan-400">
                <span>Start Practicing</span>
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Graph Card */}
            <button
              onClick={() => setSelectedCategory("GRAPH")}
              className="group relative bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100 dark:from-violet-950 dark:via-purple-950 dark:to-fuchsia-900 
                         border-2 border-violet-200 dark:border-violet-700 rounded-2xl p-8 
                         hover:shadow-2xl hover:scale-105 transition-all duration-300
                         focus:outline-none focus:ring-4 focus:ring-violet-300"
            >
              <div className="text-violet-600 dark:text-violet-400 mb-4 flex justify-center">
                <FaProjectDiagram className="w-16 h-16" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Graph Algorithms
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Traverse through complex graph problems and ace interviews
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm font-medium text-violet-600 dark:text-violet-400">
                <span>Start Practicing</span>
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
      <div className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              setSelectedCategory(null)
              setSelectedDifficulty(null)
              setProblems([])
            }}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Categories</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${
              selectedCategory === "DYNAMIC_PROGRAMMING" 
                ? "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400" 
                : "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
            }`}>
              <CategoryIcon category={selectedCategory} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCategory === "DYNAMIC_PROGRAMMING" ? "Dynamic Programming" : "Graph Algorithms"}
            </h2>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center justify-center space-x-3 flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <FaFilter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Filter:</span>
          </div>
          <button
            onClick={() => setSelectedDifficulty(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedDifficulty === null
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
                  ? diff === "EASY"
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md"
                    : diff === "MEDIUM"
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md"
                    : "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
              className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border-2 border-gray-200 dark:border-gray-700 
                         hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-200
                         focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Problem Number */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg 
                                  flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {index + 1}
                  </div>

                  {/* Problem Info */}
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {problem.description}
                    </p>
                    {/* Tags */}
                    {problem.tags && problem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {problem.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Difficulty Badge */}
                  <div className={`px-3 py-1 rounded-lg border text-sm font-semibold ${
                    getDifficultyColor(problem.difficulty)
                  }`}>
                    {problem.difficulty}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0">
                  <FaArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-lg">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No problems found for this filter
          </p>
        </div>
      )}
    </div>
  )
}
