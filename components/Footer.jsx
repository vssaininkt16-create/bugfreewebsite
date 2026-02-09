'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Mail, Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-cyber-green/20 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Image 
              src="https://customer-assets.emergentagent.com/job_threat-shield-37/artifacts/fadi987k_ChatGPT%20Image%20Feb%209%2C%202026%2C%2004_00_14%20PM.png"
              alt="BugZero Cyber Solutions"
              width={280}
              height={100}
              className="h-16 w-auto mb-4"
            />
            <p className="text-gray-400 mb-4 max-w-md">
              Building India's next-generation cybersecurity force. Elite ethical hackers providing 
              world-class penetration testing and security consulting services.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://www.linkedin.com/company/bugzero-cyber-solutions/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyber-cyan transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link 
                href="mailto:contact@bugzero.com" 
                className="text-gray-400 hover:text-cyber-green transition-colors"
              >
                <Mail className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cyber-green font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-cyber-green transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-cyber-green transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-cyber-green transition-colors">Services</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-cyber-green transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-cyber-green transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-cyber-green font-bold mb-4 text-lg">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">VAPT Testing</li>
              <li className="text-gray-400">API Security</li>
              <li className="text-gray-400">Network Security</li>
              <li className="text-gray-400">Bug Bounty</li>
              <li className="text-gray-400">Security Consulting</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cyber-green/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} BugZero Cyber Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-gray-500 hover:text-cyber-green transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-cyber-green transition-colors">Terms of Service</Link>
            <Link href="#" className="text-gray-500 hover:text-cyber-green transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}