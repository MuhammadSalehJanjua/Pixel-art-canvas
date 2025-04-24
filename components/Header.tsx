"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-[#2f3542] text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">Pixel Art Editor</span>
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-[#ff6b81] transition-colors">
              Home
            </Link>
            <Link href="/editor" className="hover:text-[#ff6b81] transition-colors">
              Editor
            </Link>
            <Link href="/faq" className="hover:text-[#ff6b81] transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-[#ff6b81] transition-colors">
              Contact
            </Link>
            <div className="flex items-center space-x-2 ml-4">
              <Link
                href="/login"
                className="px-4 py-2 rounded-md border border-white hover:bg-white hover:text-[#2f3542] transition-colors"
              >
                Login
              </Link>
              <Link href="/signup" className="px-4 py-2 rounded-md bg-[#ff4757] hover:bg-[#ff6b81] transition-colors">
                Sign Up
              </Link>
            </div>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            <Link href="/" className="hover:text-[#ff6b81] transition-colors">
              Home
            </Link>
            <Link href="/editor" className="hover:text-[#ff6b81] transition-colors">
              Editor
            </Link>
            <Link href="/faq" className="hover:text-[#ff6b81] transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-[#ff6b81] transition-colors">
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link
                href="/login"
                className="px-4 py-2 text-center rounded-md border border-white hover:bg-white hover:text-[#2f3542] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-center rounded-md bg-[#ff4757] hover:bg-[#ff6b81] transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
