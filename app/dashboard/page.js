'use client'

import { Shield, Lock } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CyberBackground from '@/components/CyberBackground'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <CyberBackground />
        
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <Lock className="w-24 h-24 text-cyber-green mx-auto mb-6 animate-float" />
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Dashboard <span className="text-cyber-green">Coming Soon</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8">
              This section will be available once authentication is implemented.
              Future features will include:
            </p>
            
            <div className="glass p-8 rounded-lg max-w-2xl mx-auto text-left">
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="text-cyber-green mt-1">▸</span>
                  <span>Security assessment reports and history</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-cyber-green mt-1">▸</span>
                  <span>Real-time vulnerability monitoring</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-cyber-green mt-1">▸</span>
                  <span>Project management and tracking</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-cyber-green mt-1">▸</span>
                  <span>Team collaboration tools</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-cyber-green mt-1">▸</span>
                  <span>Compliance and audit reports</span>
                </li>
              </ul>
            </div>
            
            <p className="text-gray-500 mt-8 terminal-text">
              $ ./initialize_auth_system.sh --status pending
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}