"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { FaUserCircle, FaKeyboard } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"

type NavbarProps = {
  user: {
    username: string
    gender: string
  } | null
  onLoginClick: () => void
}

export default function Navbar({ user, onLoginClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <FaKeyboard className="text-2xl text-yellow-500 group-hover:scale-110 transition-transform duration-200" />
            <div className="flex flex-col -space-y-1">
              <span className="font-bold text-2xl text-white tracking-tight">wyt?</span>
              <span className="text-[10px] text-gray-500 tracking-widest uppercase">what's your type</span>
            </div>
          </Link>

          {/* User section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors">
                  <FaUserCircle className="text-lg text-yellow-500" />
                  <span className="font-medium text-gray-200 text-sm">{user.username}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50 transition-all"
                >
                  <BiLogOut className="text-lg" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-all duration-200 hover:scale-105"
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
