'use client'

import { Search, Code, Globe, Bug, Shield, Award, Lock, Database, Cloud, Smartphone } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CyberBackground from '@/components/CyberBackground'
import ServiceCard from '@/components/ServiceCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Services() {
  const services = [
    {
      icon: Search,
      title: 'Web Application VAPT',
      description: 'Comprehensive vulnerability assessment and penetration testing for web applications',
      features: [
        'OWASP Top 10 Testing',
        'Authentication & Authorization Testing',
        'SQL Injection & XSS Detection',
        'Business Logic Vulnerability Assessment',
        'Detailed Remediation Report'
      ]
    },
    {
      icon: Code,
      title: 'API Security Testing',
      description: 'In-depth security testing for REST APIs, GraphQL, and microservices',
      features: [
        'REST API Penetration Testing',
        'GraphQL Security Assessment',
        'OAuth/JWT Token Analysis',
        'Rate Limiting & DDoS Testing',
        'API Documentation Review'
      ]
    },
    {
      icon: Globe,
      title: 'Network Security Assessment',
      description: 'Comprehensive network infrastructure security testing and hardening',
      features: [
        'External/Internal Network Scanning',
        'Firewall Configuration Review',
        'IDS/IPS Effectiveness Testing',
        'Wireless Network Security',
        'Network Segmentation Analysis'
      ]
    },
    {
      icon: Cloud,
      title: 'Cloud Security',
      description: 'Secure your cloud infrastructure on AWS, Azure, GCP, and other platforms',
      features: [
        'Cloud Configuration Audit',
        'IAM Policy Review',
        'Container Security Testing',
        'Serverless Security Assessment',
        'Cloud Compliance Audits'
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile App Security',
      description: 'Security testing for iOS and Android mobile applications',
      features: [
        'Static & Dynamic Analysis',
        'Reverse Engineering',
        'API Communication Testing',
        'Data Storage Security',
        'Certificate Pinning Validation'
      ]
    },
    {
      icon: Bug,
      title: 'Bug Bounty Assistance',
      description: 'Expert help with bug bounty programs and vulnerability research',
      features: [
        'Vulnerability Discovery',
        'Exploit Development',
        'Professional Report Writing',
        'Bug Bounty Strategy',
        'Researcher Collaboration'
      ]
    },
    {
      icon: Lock,
      title: 'Security Code Review',
      description: 'Manual and automated source code security analysis',
      features: [
        'Manual Code Review',
        'SAST Implementation',
        'Dependency Vulnerability Scan',
        'Secure Coding Training',
        'DevSecOps Integration'
      ]
    },
    {
      icon: Database,
      title: 'Database Security',
      description: 'Comprehensive database security assessment and hardening',
      features: [
        'SQL/NoSQL Security Testing',
        'Access Control Review',
        'Encryption Implementation',
        'Backup Security Assessment',
        'Database Hardening'
      ]
    },
    {
      icon: Shield,
      title: 'Security Consulting',
      description: 'Strategic cybersecurity guidance and risk management',
      features: [
        'Security Risk Assessment',
        'Compliance Audits (ISO, PCI-DSS)',
        'Security Architecture Review',
        'Incident Response Planning',
        'Security Awareness Training'
      ]
    },
    {
      icon: Award,
      title: 'Internship Programs',
      description: 'Learn cybersecurity from elite hackers with job opportunities',
      features: [
        'Hands-on Pentesting Training',
        'Real-world Project Experience',
        'Mentorship by Experts',
        'Certificate on Completion',
        'Performance-based Job Offers'
      ]
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
            backgroundImage: 'url(https://images.pexels.com/photos/6964137/pexels-photo-6964137.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-cyber-green">Services</span>
            </h1>
            <p className="text-xl text-gray-400">
              Comprehensive cybersecurity solutions to protect your digital assets from evolving threats
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative">
        <CyberBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-cyber-cyan">Process</span>
            </h2>
            <p className="text-xl text-gray-400">
              A systematic approach to identifying and eliminating security vulnerabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { step: '01', title: 'Reconnaissance', desc: 'Information gathering and threat modeling' },
              { step: '02', title: 'Scanning', desc: 'Automated and manual vulnerability discovery' },
              { step: '03', title: 'Exploitation', desc: 'Validating vulnerabilities with controlled exploits' },
              { step: '04', title: 'Reporting', desc: 'Detailed findings with remediation guidance' }
            ].map((item, index) => (
              <div key={index} className="glass p-6 rounded-lg text-center hover-glow">
                <div className="text-4xl font-bold text-cyber-green mb-3 terminal-text">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="glass p-12 rounded-lg text-center max-w-4xl mx-auto cyber-glow">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="text-cyber-green">Secure</span> Your Systems?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Let our elite team of ethical hackers protect your organization
            </p>
            <Link href="/contact">
              <Button className="bg-cyber-green text-black hover:bg-cyber-cyan hover:text-black font-bold text-lg px-8 py-6">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}