'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-cyber-darker border-t border-cyber-green/10 pt-16 pb-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-green/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="relative w-[200px] h-20 mb-6 group">
              <Image 
                src="https://customer-assets.emergentagent.com/job_threat-shield-37/artifacts/bdoiid65_ChatGPT%20Image%20Feb%209%2C%202026%2C%2007_00_46%20PM.png"
                alt="BugZero Cyber Solutions"
                fill
                className="object-contain"
                sizes="200px"
              />
              <div className="absolute inset-0 bg-cyber-green/0 group-hover:bg-cyber-green/5 blur-xl transition-all duration-500"></div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Building India's next-generation cybersecurity force. Elite ethical hackers providing 
              world-class penetration testing and security consulting services.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://www.linkedin.com/company/bugzero-cyber-solutions/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative group p-3 glass-card rounded-lg hover-lift"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-cyber-cyan transition-colors duration-300" />
                <div className="absolute inset-0 bg-cyber-cyan/0 group-hover:bg-cyber-cyan/10 blur-xl transition-all duration-500 rounded-lg"></div>
              </Link>
              <Link 
                href="mailto:contact@bugzero.com" 
                className="relative group p-3 glass-card rounded-lg hover-lift"
              >
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-cyber-green transition-colors duration-300" />
                <div className="absolute inset-0 bg-cyber-green/0 group-hover:bg-cyber-green/10 blur-xl transition-all duration-500 rounded-lg"></div>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cyber-green font-bold mb-6 text-lg uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Careers', href: '/careers' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-cyber-green transition-all duration-300 relative group inline-block"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-cyber-green transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-cyber-green font-bold mb-6 text-lg uppercase tracking-wider">Services</h3>
            <ul className="space-y-3">
              {[
                'VAPT Testing',
                'API Security',
                'Network Security',
                'Cloud Security',
                'Bug Bounty',
                'Security Consulting'
              ].map((service) => (
                <li key={service} className="text-gray-400 text-sm">
                  <span className="inline-flex items-center space-x-2 group cursor-default">
                    <span className="text-cyber-green text-xs group-hover:scale-125 transition-transform duration-300">▸</span>
                    <span className="group-hover:text-cyber-green transition-colors duration-300">{service}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cyber-green/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BugZero Cyber Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-gray-500 hover:text-cyber-green transition-colors duration-300 relative group">
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-px bg-cyber-green transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-cyber-green transition-colors duration-300 relative group">
              Terms of Service
              <span className="absolute bottom-0 left-0 w-0 h-px bg-cyber-green transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-cyber-green transition-colors duration-300 relative group">
              Security
              <span className="absolute bottom-0 left-0 w-0 h-px bg-cyber-green transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyber-green/50 to-transparent"></div>
    </footer>
  )
}