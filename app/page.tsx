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
    <div className="min-h-screen bg-black">
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
            <div className="mb-6 bg-gray-950 border border-gray-800 rounded p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">
                  Daily Tests Remaining
                </span>
                <span className="text-xl font-bold text-white">
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
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
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
            <div className="mt-6 bg-gray-950 border border-gray-800 rounded p-4">
              <p className="text-sm text-gray-400">
                <strong className="text-white">Guest Mode:</strong> You can practice, but your progress
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
