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
      <FaUserTie className="text-xl text-white" />
    ) : (
      <FaUserNinja className="text-xl text-white" />
    )
  }

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <IoFlashSharp className="text-2xl text-white group-hover:text-gray-300 transition-all" />
            <span className="font-bold text-xl text-white tracking-tight">What's Your Type?</span>
          </Link>

          {/* User section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-900 rounded border border-gray-800">
                  {getUserIcon(user.gender)}
                  <span className="font-medium text-gray-200">{user.username}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition"
                >
                  <BiLogOut className="text-lg" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-6 py-2 bg-white hover:bg-gray-200 text-black font-medium rounded transition"
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
