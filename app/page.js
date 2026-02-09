'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, Lock, Globe, Bug, Award, ArrowRight, Terminal, Code, Search, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CyberBackground from '@/components/CyberBackground'
import ServiceCard from '@/components/ServiceCard'

export default function Home() {
  const [text, setText] = useState('')
  const fullText = 'Building India\'s Next-Generation Cybersecurity Force'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  const services = [
    {
      icon: Search,
      title: 'VAPT Testing',
      description: 'Comprehensive Vulnerability Assessment and Penetration Testing',
      features: ['Web Application Testing', 'Mobile App Security', 'Infrastructure Audits']
    },
    {
      icon: Code,
      title: 'API Security',
      description: 'Secure your APIs against modern threats and vulnerabilities',
      features: ['REST API Testing', 'GraphQL Security', 'OAuth/JWT Analysis']
    },
    {
      icon: Globe,
      title: 'Network Security',
      description: 'Protect your network infrastructure from cyber threats',
      features: ['Network Audits', 'Firewall Testing', 'IDS/IPS Validation']
    },
    {
      icon: Bug,
      title: 'Bug Bounty',
      description: 'Expert assistance for bug bounty programs and submissions',
      features: ['Vulnerability Research', 'Report Writing', 'Exploit Development']
    },
    {
      icon: Shield,
      title: 'Security Consulting',
      description: 'Strategic security guidance for your organization',
      features: ['Risk Assessment', 'Compliance Audits', 'Security Training']
    },
    {
      icon: Award,
      title: 'Internship Programs',
      description: 'Learn from elite hackers with performance-based job opportunities',
      features: ['Hands-on Training', 'Mentorship', 'Certificate Provided']
    }
  ]

  const stats = [
    { number: '500+', label: 'Security Audits' },
    { number: '50+', label: 'Enterprise Clients' },
    { number: '100%', label: 'Success Rate' },
    { number: '24/7', label: 'Support' }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <CyberBackground />
        
        {/* Hero image overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 inline-block">
              <span className="terminal-text text-sm md:text-base">$ sudo access_granted</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">{text}</span>
              <span className="text-cyber-green animate-pulse">|</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Elite ethical hackers providing world-class penetration testing, 
              VAPT, and cybersecurity consulting services
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/contact">
                <Button className="bg-cyber-green text-black hover:bg-cyber-cyan hover:text-black font-bold text-lg px-8 py-6 cyber-glow">
                  Get Secured
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/careers">
                <Button variant="outline" className="border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black font-bold text-lg px-8 py-6">
                  Join Our Team
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 items-center text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-cyber-green" />
                <span>ISO 27001 Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-cyber-green" />
                <span>OWASP Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-cyber-green" />
                <span>24/7 Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center glass p-6 rounded-lg hover-glow">
                <div className="text-4xl md:text-5xl font-bold text-cyber-green mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        <CyberBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-cyber-green">Services</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive cybersecurity solutions to protect your digital assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button className="bg-cyber-green text-black hover:bg-cyber-cyan hover:text-black font-bold text-lg px-8 py-6">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="glass p-12 rounded-lg text-center max-w-4xl mx-auto cyber-glow">
            <Terminal className="w-16 h-16 text-cyber-green mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="text-cyber-green">Secure</span> Your Digital Assets?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join hundreds of organizations trusting BugZero for their cybersecurity needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-cyber-green text-black hover:bg-cyber-cyan hover:text-black font-bold text-lg px-8 py-6">
                  Contact Us Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black font-bold text-lg px-8 py-6">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}