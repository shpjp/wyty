"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useSession } from "next-auth/react"
import { FaGithub } from "react-icons/fa"
import Navbar from "@/components/Navbar"
import AuthModal from "@/components/AuthModal"
import CodeEditor from "@/components/CodeEditor"
import ProblemSelector from "@/components/ProblemSelector"

export default function Home() {
  const { data: session } = useSession()
  const [showAuthModal, setShowAuthModal] = useState(true)
  const [problem, setProblem] = useState<any>(null)
  const [attemptsRemaining, setAttemptsRemaining] = useState(3)

  const fetchAttemptLimit = useCallback(async () => {
    try {
      const res = await fetch("/api/attempts/limit")
      if (res.ok) {
        const data = await res.json()
        setAttemptsRemaining(data.attemptsRemaining)
      }
    } catch (error) {
      console.error("Failed to fetch attempt limit:", error)
    }
  }, [])

  useEffect(() => {
    if (session?.user) {
      fetchAttemptLimit()
    }
  }, [session, fetchAttemptLimit])

  const handleSelectProblem = useCallback((selectedProblem: any) => {
    setProblem(selectedProblem)
  }, [])

  const handleBackToSelection = useCallback(() => {
    setProblem(null)
  }, [])

  const handleComplete = useCallback(async (stats: {
    wpm: number
    accuracy: number
    timeSpent: number
  }) => {
    if (!session?.user || !problem) return

    try {
      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: problem.id,
          wpm: stats.wpm,
          accuracy: stats.accuracy,
          timeSpent: stats.timeSpent,
          isCompleted: true,
        }),
      })

      if (res.ok) {
        fetchAttemptLimit()
      }
    } catch (error) {
      console.error("Failed to save attempt:", error)
    }
  }, [session, problem, fetchAttemptLimit])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      {/* Auth Modal with backdrop blur */}
      {showAuthModal && !session && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* Main content */}
      <div className={showAuthModal && !session ? "blur-[2px] opacity-60" : ""}>
        <Navbar
          user={useMemo(
            () =>
              session?.user
                ? {
                    username: session.user.name || "User",
                    gender: (session.user as any).gender || "MALE",
                  }
                : null,
            [session?.user]
          )}
          onLoginClick={useCallback(() => setShowAuthModal(true), [])}
        />

        <main className="max-w-7xl mx-auto px-8 pt-24 pb-12">
          {/* Attempt counter */}
          {session?.user && (
            <div className="mb-8 bg-[#1a1a1a]/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">
                  Daily Tests Remaining
                </span>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < attemptsRemaining ? 'bg-yellow-500' : 'bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xl font-bold text-white">
                    {attemptsRemaining}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          {!problem ? (
            <ProblemSelector 
              onSelectProblem={handleSelectProblem}
              attemptsRemaining={attemptsRemaining}
            />
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Back Button */}
              <button
                onClick={handleBackToSelection}
                className="flex items-center space-x-2 text-gray-400 hover:text-yellow-500 transition-all group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back to Problems</span>
              </button>

              <CodeEditor
                problem={problem}
                isAuthenticated={!!session?.user}
                onComplete={handleComplete}
                attemptsRemaining={attemptsRemaining}
              />
            </div>
          )}

          {/* Guest notice */}
          {!session?.user && (
            <div className="mt-8 bg-[#1a1a1a]/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 shadow-lg">
              <p className="text-sm text-gray-400">
                <strong className="text-yellow-500">Guest Mode:</strong> You can practice, but your progress
                won't be saved. Login to track your stats and improve over time!
              </p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800/50 bg-[#0a0a0a]/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-center">
              <a
                href="https://github.com/shpjp/wyty"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-yellow-500 transition-all group"
              >
                <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">View on GitHub</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
