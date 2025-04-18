"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [mobileMenuOpen])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="border-b border-orange-500/20 sticky top-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/images/sesc-logo.png"
            alt="Student Community Logo"
            width={240}
            height={80}
            className="h-16 md:h-20 w-auto"
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#tracking" className="text-white/80 hover:text-orange-500 transition-colors font-medium">
            Order Status
          </Link>
          <Link href="#availability" className="text-white/80 hover:text-orange-500 transition-colors font-medium">
            Stock Availability
          </Link>
          <Link href="#pickup" className="text-white/80 hover:text-orange-500 transition-colors font-medium">
            Pickup Locations
          </Link>
          <Link href="#faq" className="text-white/80 hover:text-orange-500 transition-colors font-medium">
            Help
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white/80 hover:text-orange-500 transition-colors"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation with Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-black/95 border-b border-orange-500/20 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <Link
                  href="#tracking"
                  className="text-white/80 hover:text-orange-500 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-white/5 block"
                  onClick={closeMobileMenu}
                >
                  Order Status
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <Link
                  href="#availability"
                  className="text-white/80 hover:text-orange-500 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-white/5 block"
                  onClick={closeMobileMenu}
                >
                  Stock Availability
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.2 }}
              >
                <Link
                  href="#pickup"
                  className="text-white/80 hover:text-orange-500 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-white/5 block"
                  onClick={closeMobileMenu}
                >
                  Pickup Locations
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.2 }}
              >
                <Link
                  href="#faq"
                  className="text-white/80 hover:text-orange-500 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-white/5 block"
                  onClick={closeMobileMenu}
                >
                  Help
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
