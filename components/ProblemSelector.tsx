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
        return "bg-gray-800 text-gray-200 border-gray-700"
      case "MEDIUM":
        return "bg-gray-700 text-gray-100 border-gray-600"
      case "HARD":
        return "bg-gray-600 text-white border-gray-500"
      default:
        return "bg-gray-900 text-gray-300 border-gray-800"
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
            <h1 className="text-6xl font-bold text-white mb-2 tracking-tight">
              Find Your Type
            </h1>
            <p className="text-xl text-gray-400">
              What's your type? Discover your typing speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dynamic Programming Card */}
            <button
              onClick={() => setSelectedCategory("DYNAMIC_PROGRAMMING")}
              className="group bg-gray-950 border border-gray-800 hover:border-white rounded p-8 transition-all duration-300 text-left"
            >
              <div className="text-white mb-4">
                <FaChartLine className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Dynamic Programming
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                Master DP patterns and optimize your problem-solving skills
              </p>
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-300 group-hover:text-white">
                <span>Start Test</span>
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Graph Card */}
            <button
              onClick={() => setSelectedCategory("GRAPH")}
              className="group bg-gray-950 border border-gray-800 hover:border-white rounded p-8 transition-all duration-300 text-left"
            >
              <div className="text-white mb-4">
                <FaProjectDiagram className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Graph Algorithms
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                Traverse through complex graph problems and ace interviews
              </p>
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-300 group-hover:text-white">
                <span>Start Test</span>
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
      <div className="bg-gray-950 border border-gray-800 rounded p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              setSelectedCategory(null)
              setSelectedDifficulty(null)
              setProblems([])
            }}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Categories</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-white">
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
            <FaFilter className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-400">Filter:</span>
          </div>
          <button
            onClick={() => setSelectedDifficulty(null)}
            className={`px-4 py-2 rounded font-medium transition-all ${
              selectedDifficulty === null
                ? "bg-white text-black"
                : "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800"
            }`}
          >
            All
          </button>
          {["EASY", "MEDIUM", "HARD"].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-4 py-2 rounded font-medium transition-all ${
                selectedDifficulty === diff
                  ? "bg-white text-black"
                  : "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800"
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
              className="group bg-gray-950 rounded p-6 border border-gray-800 hover:border-white transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Problem Number */}
                  <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>

                  {/* Problem Info */}
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">
                      {problem.title}
                    </h3>
                    {/* Tags */}
                    {problem.tags && problem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {problem.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs font-medium bg-gray-900 text-gray-300 rounded border border-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Difficulty Badge */}
                  <div className={`px-3 py-1 rounded border text-sm font-semibold ${
                    getDifficultyColor(problem.difficulty)
                  }`}>
                    {problem.difficulty}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0">
                  <FaArrowRight className="w-6 h-6 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-gray-950 border border-gray-800 rounded p-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-xl text-gray-400">
            No problems found for this filter
          </p>
        </div>
      )}
    </div>
  )
}
