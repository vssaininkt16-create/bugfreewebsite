'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 20)

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false)
      } else if (currentScrollY < lastScrollY.current) {
        setVisible(true)
      }

      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-500 transition-transform duration-300 ${
        scrolled
          ? 'glass-nav shadow-lg shadow-cyber-green/10'
          : 'bg-black/60 backdrop-blur-md'
      }`}
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-28">

          {/* ✅ LOGO — FIXED SIZE, NON-CLICKABLE */}
          <div className="flex items-center flex-shrink-0 cursor-default select-none">
            <img
              src="https://customer-assets.emergentagent.com/job_threat-shield-37/artifacts/bdoiid65_ChatGPT%20Image%20Feb%209%2C%202026%2C%2007_00_46%20PM.png"
              alt="BugZero Cyber Solutions"
              className="
                object-contain
                w-[150px] md:w-[280px]
                h-auto
                max-w-none
                flex-shrink-0
              "
              style={{
                pointerEvents: 'none',
                filter: 'drop-shadow(0 2px 10px rgba(0,255,136,0.25))',
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-gray-300 hover:text-cyber-green transition-all duration-300 font-medium text-sm uppercase tracking-wider group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyber-green to-cyber-cyan transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            <Link
              href="https://www.linkedin.com/company/bugzero-cyber-solutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyber-cyan transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </Link>

            <Button className="bg-gradient-to-r from-cyber-green to-cyber-cyan text-black font-bold px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-cyber-green/50 transition-all duration-300">
              Request Assessment
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyber-green p-2 hover:bg-cyber-green/10 rounded-lg transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden glass-card border-t border-cyber-green/20 py-4 mb-4 rounded-b-lg animate-fade-in-up">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-gray-300 hover:text-cyber-green hover:bg-cyber-green/5 transition uppercase tracking-wider text-sm"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="https://www.linkedin.com/company/bugzero-cyber-solutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-gray-300 hover:text-cyber-cyan"
            >
              <div className="flex items-center space-x-2">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </div>
            </Link>

            <div className="px-4 py-3">
              <Button className="w-full bg-gradient-to-r from-cyber-green to-cyber-cyan text-black font-bold rounded-lg">
                Request Assessment
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
