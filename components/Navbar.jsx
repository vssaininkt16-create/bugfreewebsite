'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Shield, Menu, X, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'glass-nav shadow-lg shadow-cyber-green/5' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          {/* Logo - Fixed Size */}
          <Link href="/" className="relative group flex items-center">
            <div className="relative w-[160px] md:w-[180px] h-16 transition-all duration-300 group-hover:scale-105">
              <Image 
                src="https://customer-assets.emergentagent.com/job_threat-shield-37/artifacts/bdoiid65_ChatGPT%20Image%20Feb%209%2C%202026%2C%2007_00_46%20PM.png"
                alt="BugZero Cyber Solutions"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 160px, 180px"
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-cyber-green/0 group-hover:bg-cyber-green/5 blur-xl transition-all duration-500"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-gray-300 hover:text-cyber-green transition-all duration-300 font-medium text-sm uppercase tracking-wider group"
              >
                {link.name}
                {/* Underline effect */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyber-green to-cyber-cyan transition-all duration-300 group-hover:w-full"></span>
                {/* Glow effect */}
                <span className="absolute inset-0 bg-cyber-green/0 group-hover:bg-cyber-green/10 blur-xl transition-all duration-500"></span>
              </Link>
            ))}
            
            <Link 
              href="https://www.linkedin.com/company/bugzero-cyber-solutions/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyber-cyan transition-all duration-300 relative group"
            >
              <Linkedin className="w-5 h-5" />
              <span className="absolute inset-0 bg-cyber-cyan/0 group-hover:bg-cyber-cyan/20 blur-xl transition-all duration-500"></span>
            </Link>
            
            <Button className="relative bg-gradient-to-r from-cyber-green to-cyber-cyan text-black font-bold px-6 py-2 rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-cyber-green/50 transition-all duration-300">
              <span className="relative z-10">Get Secured</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan to-cyber-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative text-cyber-green p-2 hover:bg-cyber-green/10 rounded-lg transition-all duration-300"
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
                className="block px-4 py-3 text-gray-300 hover:text-cyber-green hover:bg-cyber-green/5 transition-all duration-300 uppercase tracking-wider text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="https://www.linkedin.com/company/bugzero-cyber-solutions/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-4 py-3 text-gray-300 hover:text-cyber-cyan transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </div>
            </Link>
            <div className="px-4 py-3">
              <Button className="w-full bg-gradient-to-r from-cyber-green to-cyber-cyan text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyber-green/50 transition-all duration-300">
                Get Secured
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}