"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { IoFlashSharp } from "react-icons/io5"
import { FaUserTie, FaUserNinja } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"

type NavbarProps = {
  user: {
    username: string
    gender: string
  } | null
  onLoginClick: () => void
}

export default function Navbar({ user, onLoginClick }: NavbarProps) {
  const getUserIcon = (gender: string) => {
    return gender === "MALE" ? (
      <FaUserTie className="text-xl text-blue-600 dark:text-blue-400" />
    ) : (
      <FaUserNinja className="text-xl text-purple-600 dark:text-purple-400" />
    )
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <IoFlashSharp className="text-3xl text-yellow-500 dark:text-yellow-400 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">What's Your Type?</span>
          </Link>

          {/* User section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  {getUserIcon(user.gender)}
                  <span className="font-medium">{user.username}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                >
                  <BiLogOut className="text-lg" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
