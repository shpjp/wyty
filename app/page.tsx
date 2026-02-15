"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useSession } from "next-auth/react"
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
    <div className="min-h-screen">
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

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Attempt counter */}
          {session?.user && (
            <div className="mb-6 bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-100 dark:from-cyan-950 dark:via-blue-950 dark:to-indigo-900 rounded-xl p-4 shadow-md border border-cyan-200 dark:border-cyan-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Daily Attempts Remaining
                  </span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  {attemptsRemaining}/3
                </span>
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
            <div className="space-y-4">
              {/* Back Button */}
              <button
                onClick={handleBackToSelection}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back to Problem Selection</span>
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
            <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Guest Mode:</strong> You can practice, but your progress
                won't be saved. Login to track your stats and compete with
                others!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
