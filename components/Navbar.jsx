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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass cyber-glow' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Image 
              src="https://customer-assets.emergentagent.com/job_threat-shield-37/artifacts/fadi987k_ChatGPT%20Image%20Feb%209%2C%202026%2C%2004_00_14%20PM.png"
              alt="BugZero Cyber Solutions"
              width={400}
              height={120}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-cyber-green transition-colors duration-300 font-medium relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-green transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link 
              href="https://www.linkedin.com/company/bugzero-cyber-solutions/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyber-cyan transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Button className="bg-cyber-green text-black hover:bg-cyber-cyan hover:text-black font-bold">
              Get Secured
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyber-green"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden glass border-t border-cyber-green/20 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-gray-300 hover:text-cyber-green hover:bg-cyber-green/5 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="https://www.linkedin.com/in/vishal-saini-b32782321/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-4 py-3 text-gray-300 hover:text-cyber-cyan transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </div>
            </Link>
            <div className="px-4 py-3">
              <Button className="w-full bg-cyber-green text-black hover:bg-cyber-cyan font-bold">
                Get Secured
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}