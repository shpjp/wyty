"use client"

import { useState, useCallback, useMemo } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "MALE" as "MALE" | "FEMALE",
    college: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isLogin) {
        // Login
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.error) {
          setError("Invalid credentials")
        } else {
          router.refresh()
          onClose()
        }
      } else {
        // Signup
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (!res.ok) {
          const data = await res.json()
          // Handle validation errors properly
          if (Array.isArray(data.error)) {
            setError(data.error.map((err: any) => err.message).join(", "))
          } else {
            setError(data.error || "Signup failed")
          }
        } else {
          // Auto login after signup
          await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
          })
          router.refresh()
          onClose()
        }
      }
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#1a1a1a]/90 backdrop-blur-xl border border-gray-800/50 rounded-xl p-8 w-full max-w-md m-4 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-yellow-500 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-2 text-center text-white">
          {isLogin ? "Welcome back" : "Join wyt?"}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          {isLogin ? "Login to track your progress" : "Sign up to save your stats"}
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-400">
                Username
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-[#0a0a0a]/80 border border-gray-800/50 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-400">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-[#0a0a0a]/80 border border-gray-800/50 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-400">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-[#0a0a0a]/80 border border-gray-800/50 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gender: e.target.value as "MALE" | "FEMALE",
                    })
                  }
                  className="w-full px-4 py-2.5 bg-[#0a0a0a]/80 border border-gray-800/50 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">
                  College (Optional)
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) =>
                    setFormData({ ...formData, college: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-[#0a0a0a]/80 border border-gray-800/50 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 mt-6"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between login/signup */}
        <p className="mt-6 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError("")
            }}
            className="text-yellow-500 hover:text-yellow-400 font-medium transition-colors"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  )
}
