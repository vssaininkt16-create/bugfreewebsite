'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Shield, Lock, Globe, Bug, Award, ArrowRight, Terminal, Code, Search, Zap, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CyberBackground from '@/components/CyberBackground'
import ServiceCard from '@/components/ServiceCard'

export default function Home() {
  const [text, setText] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const fullText = "Building India's Next-Generation Cybersecurity Force"
  const heroRef = useRef(null)

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height
        setMousePosition({ x, y })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
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
    <div className='min-h-screen bg-cyber-darker text-white overflow-hidden'>
      <Navbar />

      {/* Hero Section with 3D Parallax */}
      <section 
        ref={heroRef}
        className='relative min-h-screen flex items-center justify-center overflow-hidden perspective-container'
      >
        <CyberBackground />
        
        {/* Parallax layers */}
        <div 
          className='absolute inset-0 opacity-20'
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        ></div>

        <div className='container mx-auto px-4 relative z-10 pt-32 pb-20'>
          <div className='max-w-5xl mx-auto text-center'>
            {/* Terminal Badge */}
            <div className='mb-8 inline-block animate-fade-in-up'>
              <div className='inline-flex items-center space-x-2 glass-card px-6 py-3 rounded-full border border-cyber-green/20'>
                <Terminal className='w-4 h-4 text-cyber-green' />
                <span className='terminal-text text-sm'>$ sudo access_granted</span>
                <Sparkles className='w-4 h-4 text-cyber-cyan animate-pulse' />
              </div>
            </div>
            
            {/* Main Headline with 3D effect */}
            <h1 
              className='text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-fade-in-up'
              style={{
                transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
                animationDelay: '0.2s'
              }}
            >
              <span className='gradient-text block mb-2'>{text}</span>
              <span className='text-cyber-green animate-pulse inline-block'>|</span>
            </h1>
            
            {/* Subtitle */}
            <p 
              className='text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up'
              style={{
                transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`,
                animationDelay: '0.4s'
              }}
            >
              Elite ethical hackers providing world-class penetration testing, 
              VAPT, and cybersecurity consulting services
            </p>
            
            {/* CTA Buttons with 3D lift */}
            <div 
              className='flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up'
              style={{ animationDelay: '0.6s' }}
            >
              <Link href='/contact'>
                <Button className='relative group bg-gradient-to-r from-cyber-green to-cyber-cyan text-black font-bold text-lg px-10 py-7 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300'>
                  <span className='relative z-10 flex items-center'>
                    Get Secured
                    <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
                  </span>
                  <div className='absolute inset-0 bg-gradient-to-r from-cyber-cyan to-cyber-green opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <div className='absolute inset-0 neon-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                </Button>
              </Link>
              <Link href='/careers'>
                <Button variant='outline' className='relative group border-2 border-cyber-green text-cyber-green hover:text-black font-bold text-lg px-10 py-7 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300'>
                  <span className='relative z-10'>Join Our Team</span>
                  <div className='absolute inset-0 bg-cyber-green opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </Button>
              </Link>
            </div>

            {/* Trust badges with 3D depth */}
            <div 
              className='flex flex-wrap justify-center gap-8 items-center text-gray-500 animate-fade-in-up'
              style={{ animationDelay: '0.8s' }}
            >
              {[
                { icon: Shield, text: 'ISO 27001 Compliant' },
                { icon: Lock, text: 'OWASP Certified' },
                { icon: Zap, text: '24/7 Response' }
              ].map((badge, idx) => (
                <div key={idx} className='flex items-center space-x-2 glass-card px-4 py-2 rounded-lg hover-lift group'>
                  <badge.icon className='w-5 h-5 text-cyber-green group-hover:scale-110 transition-transform' />
                  <span className='text-sm group-hover:text-cyber-green transition-colors'>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyber-darker to-transparent'></div>
      </section>

      {/* Stats Section with 3D cards */}
      <section className='py-20 relative'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className='text-center glass-card p-8 rounded-xl hover-lift group perspective-container'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className='text-5xl md:text-6xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform duration-300'>
                  {stat.number}
                </div>
                <div className='text-gray-400 uppercase tracking-wider text-sm group-hover:text-cyber-green transition-colors'>{stat.label}</div>
                
                {/* Corner accent */}
                <div className='absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-cyber-green/20 rounded-tr-lg group-hover:border-cyber-green/60 transition-colors'></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className='py-24 relative'>
        <CyberBackground />
        <div className='container mx-auto px-4 relative z-10'>
          <div className='text-center mb-16'>
            <h2 className='text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up'>
              Our <span className='gradient-text'>Services</span>
            </h2>
            <p className='text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up' style={{ animationDelay: '0.2s' }}>
              Comprehensive cybersecurity solutions to protect your digital assets from evolving threats
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
            {services.map((service, index) => (
              <div 
                key={index}
                className='animate-scale-in'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>

          <div className='text-center mt-16 animate-fade-in-up' style={{ animationDelay: '0.8s' }}>
            <Link href='/services'>
              <Button className='relative group bg-gradient-to-r from-cyber-green to-cyber-cyan text-black font-bold text-lg px-10 py-6 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300'>
                <span className='relative z-10 flex items-center'>
                  View All Services
                  <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </span>
                <div className='absolute inset-0 bg-gradient-to-r from-cyber-cyan to-cyber-green opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 relative'>
        <div className='container mx-auto px-4'>
          <div className='glass-card p-12 md:p-16 rounded-2xl text-center max-w-5xl mx-auto relative overflow-hidden group neon-glow'>
            {/* Animated background */}
            <div className='absolute inset-0 bg-gradient-to-br from-cyber-green/5 to-cyber-cyan/5 group-hover:from-cyber-green/10 group-hover:to-cyber-cyan/10 transition-all duration-500'></div>
            
            <div className='relative z-10'>
              <Terminal className='w-20 h-20 text-cyber-green mx-auto mb-8 animate-float-slow' />
              <h2 className='text-4xl md:text-5xl font-bold mb-6'>
                Ready to <span className='gradient-text'>Secure</span> Your Digital Assets?
              </h2>
              <p className='text-xl text-gray-400 mb-10 max-w-2xl mx-auto'>
                Join hundreds of organizations trusting BugZero for their cybersecurity needs
              </p>
              <div className='flex flex-col sm:flex-row gap-6 justify-center'>
                <Link href='/contact'>
                  <Button className='relative group bg-gradient-to-r from-cyber-green to-cyber-cyan text-black font-bold text-lg px-10 py-7 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300'>
                    <span className='relative z-10 flex items-center'>
                      Contact Us Today
                      <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
                    </span>
                    <div className='absolute inset-0 bg-gradient-to-r from-cyber-cyan to-cyber-green opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </Button>
                </Link>
                <Link href='/about'>
                  <Button variant='outline' className='border-2 border-cyber-green text-cyber-green hover:text-black font-bold text-lg px-10 py-7 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 relative group'>
                    <span className='relative z-10'>Learn More About Us</span>
                    <div className='absolute inset-0 bg-cyber-green opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Corner decorations */}
            <div className='absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-cyber-green/30 rounded-tl-xl'></div>
            <div className='absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-cyber-cyan/30 rounded-br-xl'></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
