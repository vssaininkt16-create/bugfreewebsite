'use client'

import { Award, Users, Zap, BookOpen, TrendingUp, Target } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CyberBackground from '@/components/CyberBackground'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Careers() {
  const benefits = [
    {
      icon: BookOpen,
      title: 'Learn from Experts',
      description: 'Work alongside elite ethical hackers with years of real-world experience'
    },
    {
      icon: Award,
      title: 'Certificate Provided',
      description: 'Receive an industry-recognized certificate upon successful completion'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Performance-based job opportunities for outstanding interns'
    },
    {
      icon: Zap,
      title: 'Hands-on Training',
      description: 'Real-world penetration testing projects and security research'
    },
    {
      icon: Users,
      title: 'Mentorship',
      description: 'One-on-one guidance from senior security researchers'
    },
    {
      icon: Target,
      title: 'Skill Development',
      description: 'Master VAPT, bug bounty hunting, and security consulting'
    }
  ]

  const positions = [
    {
      title: 'Cybersecurity Intern',
      type: 'Internship (3-6 months)',
      skills: ['Basic networking knowledge', 'Interest in ethical hacking', 'Problem-solving mindset'],
      description: 'Learn penetration testing, vulnerability assessment, and security consulting'
    },
    {
      title: 'Penetration Tester',
      type: 'Full-time',
      skills: ['Experience with VAPT', 'Knowledge of security tools', 'CEH/OSCP preferred'],
      description: 'Conduct security assessments for web, mobile, and network infrastructure'
    },
    {
      title: 'Security Researcher',
      type: 'Full-time',
      skills: ['Advanced exploitation', 'Bug bounty experience', 'Research mindset'],
      description: 'Discover new vulnerabilities and develop security solutions'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <CyberBackground />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1548092372-0d1bd40894a3)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Join the <span className="text-cyber-green">Elite</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Start your cybersecurity career with India's premier ethical hacking team
            </p>
            <div className="terminal-text text-lg">
              $ ./join_bugzero.sh --start-now
            </div>
          </div>
        </div>
      </section>

      {/* Internship Program Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass p-8 md:p-12 rounded-lg mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Cybersecurity <span className="text-cyber-green">Internship Program</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Are you passionate about cybersecurity and eager to learn from the best? Our internship 
                program offers fresh graduates and security enthusiasts a unique opportunity to train 
                under elite ethical hackers.
              </p>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <span className="text-cyber-green text-xl mt-1">▸</span>
                  <div>
                    <strong className="text-white">Duration:</strong> 3-6 months intensive training
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-cyber-green text-xl mt-1">▸</span>
                  <div>
                    <strong className="text-white">Training:</strong> Hands-on penetration testing, VAPT, bug bounty hunting
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-cyber-green text-xl mt-1">▸</span>
                  <div>
                    <strong className="text-white">Certification:</strong> Industry-recognized certificate upon completion
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-cyber-green text-xl mt-1">▸</span>
                  <div>
                    <strong className="text-white">Job Opportunity:</strong> Top performers are offered full-time positions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <CyberBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="text-cyber-cyan">BugZero</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              What makes our program the best place to start your cybersecurity career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass p-6 rounded-lg hover-glow">
                <div className="p-3 bg-cyber-green/10 rounded-lg inline-block mb-4">
                  <benefit.icon className="w-8 h-8 text-cyber-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Open <span className="text-cyber-green">Positions</span>
            </h2>

            <div className="space-y-6">
              {positions.map((position, index) => (
                <div key={index} className="glass p-8 rounded-lg hover-glow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{position.title}</h3>
                      <span className="inline-block px-3 py-1 bg-cyber-green/20 text-cyber-green rounded-full text-sm">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{position.description}</p>
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {position.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-black/50 border border-cyber-green/30 rounded text-sm text-gray-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link href={position.title === 'Cybersecurity Intern' ? '/apply' : '/contact'}>
                    <Button className="bg-cyber-green text-black hover:bg-cyber-cyan hover:text-black font-bold">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <CyberBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass p-12 rounded-lg text-center max-w-4xl mx-auto cyber-glow">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="text-cyber-green">Start</span> Your Journey?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join the next generation of elite ethical hackers
            </p>
            <Link href="/contact">
              <Button className="bg-cyber-green text-black hover:bg-cyber-cyan hover:text-black font-bold text-lg px-8 py-6">
                Apply Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}