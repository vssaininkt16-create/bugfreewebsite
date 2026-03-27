'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Shield, Lock, Bug, ArrowRight, Code, Search,
  Zap, Eye, FileCheck, Activity, CheckCircle2, Fingerprint,
  Network, Server, BookOpen, Clock, Users, TrendingUp,
  ShieldCheck, ScanLine, Wrench, MonitorCheck, Radar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function useScrollReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    const elements = ref.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function Home() {
  const sectionRef = useScrollReveal()

  const services = [
    {
      icon: Search,
      title: 'VAPT Testing',
      description: 'Rigorous vulnerability assessment and penetration testing across your web, mobile, and infrastructure attack surface.',
      tags: ['Web Apps', 'Mobile', 'Infrastructure']
    },
    {
      icon: Code,
      title: 'API Security',
      description: 'Deep analysis of REST, GraphQL, and microservice APIs to uncover authentication flaws, injection points, and logic vulnerabilities.',
      tags: ['REST', 'GraphQL', 'OAuth/JWT']
    },
    {
      icon: Network,
      title: 'Network Security',
      description: 'Comprehensive network penetration testing, firewall validation, and segmentation audits to fortify your perimeter.',
      tags: ['Firewall', 'IDS/IPS', 'Segmentation']
    },
    {
      icon: Bug,
      title: 'Bug Bounty Support',
      description: 'End-to-end bug bounty program management — from vulnerability research and triage to detailed reporting.',
      tags: ['Research', 'Triage', 'Reporting']
    },
    {
      icon: Shield,
      title: 'Security Consulting',
      description: 'Strategic advisory for risk management, compliance readiness, and building a resilient security posture.',
      tags: ['Risk', 'Compliance', 'Strategy']
    },
    {
      icon: BookOpen,
      title: 'Training & Internships',
      description: 'Hands-on cybersecurity training programs with mentorship, real-world labs, and performance-based placement.',
      tags: ['Mentorship', 'Labs', 'Certification']
    }
  ]

  const stats = [
    { number: '500+', label: 'Security Audits', icon: ShieldCheck },
    { number: '50+', label: 'Enterprise Clients', icon: Users },
    { number: '100%', label: 'Success Rate', icon: TrendingUp },
    { number: '<4hr', label: 'Avg Response', icon: Clock }
  ]

  const whyBugZero = [
    { icon: Eye, title: 'Prevention', description: 'Identify and eliminate vulnerabilities before they become entry points for attackers.' },
    { icon: ScanLine, title: 'Detection', description: 'Advanced threat detection methodologies that surface hidden risks across your stack.' },
    { icon: Zap, title: 'Response', description: 'Rapid incident response with clear, actionable remediation guidance.' },
    { icon: FileCheck, title: 'Reporting', description: 'Executive and technical reports with severity scoring, proof-of-concept, and fix recommendations.' },
    { icon: Lock, title: 'Compliance', description: 'Align with ISO 27001, SOC 2, GDPR, PCI-DSS, and industry-specific regulatory frameworks.' },
    { icon: Fingerprint, title: 'Confidentiality', description: 'Strict NDA protocols and secure handling of all engagement data and findings.' }
  ]

  const process = [
    { icon: Radar, step: '01', title: 'Discover', description: 'Map your attack surface, assets, and threat landscape.' },
    { icon: Search, step: '02', title: 'Assess', description: 'Deep-dive testing using manual and automated techniques.' },
    { icon: Wrench, step: '03', title: 'Fix', description: 'Prioritized remediation with developer-friendly guidance.' },
    { icon: CheckCircle2, step: '04', title: 'Verify', description: 'Re-test every finding to confirm successful mitigation.' },
    { icon: MonitorCheck, step: '05', title: 'Monitor', description: 'Ongoing posture reviews and continuous assessment.' }
  ]

  return (
    <div ref={sectionRef} className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Mesh gradient background */}
        <div className="hero-mesh"></div>
        <div className="absolute inset-0 grid-bg opacity-40"></div>

        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="mb-8 reveal">
              <span className="section-badge">
                <Shield className="w-3.5 h-3.5" />
                Enterprise Cybersecurity
              </span>
            </div>

            {/* Headline */}
            <h1 className="section-heading mb-6 reveal" style={{ transitionDelay: '100ms' }}>
              <span className="text-foreground">Fortify Your Digital </span>
              <span className="gradient-text">Infrastructure</span>
              <span className="text-foreground"> Against Every Threat</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed reveal" style={{ transitionDelay: '200ms' }}>
              We identify and neutralize vulnerabilities before attackers exploit them. Trusted by enterprises for precision-driven security assessments, penetration testing, and strategic consulting.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 reveal" style={{ transitionDelay: '300ms' }}>
              <Link href="/contact">
                <Button className="bg-primary text-primary-foreground font-semibold text-base px-8 py-6 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 group">
                  <span className="flex items-center gap-2">
                    Request Assessment
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="border border-border text-foreground font-semibold text-base px-8 py-6 rounded-xl hover:bg-muted/50 transition-colors">
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 reveal" style={{ transitionDelay: '400ms' }}>
              {[
                { icon: Shield, text: 'ISO 27001' },
                { icon: Lock, text: 'OWASP Top 10' },
                { icon: Zap, text: '24/7 Response' },
                { icon: FileCheck, text: 'SOC 2 Ready' }
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-muted-foreground text-sm">
                  <badge.icon className="w-4 h-4 text-primary/70" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* ===== TRUST / CLIENT LOGOS SECTION ===== */}
      <section className="py-16 border-y border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-10 reveal">
            Trusted by security-conscious organizations
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 reveal" style={{ transitionDelay: '100ms' }}>
            {['TechCorp', 'FinSecure', 'DataShield', 'CloudNex', 'CyberVault', 'NetGuard'].map((name, idx) => (
              <div key={idx} className="flex items-center gap-2 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors">
                <Server className="w-5 h-5" />
                <span className="text-lg font-semibold tracking-tight">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center premium-card p-8 reveal"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-4 opacity-60" />
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 reveal">
              <Activity className="w-3.5 h-3.5" />
              What We Do
            </span>
            <h2 className="section-heading mb-5 reveal" style={{ transitionDelay: '100ms' }}>
              <span className="gradient-text">Security Services</span>
            </h2>
            <p className="section-subheading reveal" style={{ transitionDelay: '150ms' }}>
              Full-spectrum cybersecurity services engineered to protect, detect, and respond across your entire digital ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="premium-card p-6 lg:p-8 group reveal"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 group-hover:bg-primary/15 group-hover:border-primary/25 transition-colors">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs px-2.5 py-1 rounded-md bg-muted/50 text-muted-foreground border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14 reveal" style={{ transitionDelay: '500ms' }}>
            <Link href="/services">
              <Button variant="outline" className="border border-border text-foreground font-semibold px-8 py-5 rounded-xl hover:bg-muted/50 transition-colors group">
                <span className="flex items-center gap-2">
                  View All Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY BUGZERO SECTION ===== */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 reveal">
              <ShieldCheck className="w-3.5 h-3.5" />
              Why BugZero
            </span>
            <h2 className="section-heading mb-5 reveal" style={{ transitionDelay: '100ms' }}>
              Security That Delivers <span className="gradient-text">Outcomes</span>
            </h2>
            <p className="section-subheading reveal" style={{ transitionDelay: '150ms' }}>
              We go beyond scanning — every engagement is built around measurable results, clear accountability, and enterprise-grade trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyBugZero.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border/40 bg-card/30 hover:border-primary/20 hover:bg-card/50 transition-all duration-500 group reveal"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/8 border border-primary/12 mb-4 group-hover:bg-primary/12 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 reveal">
              <Activity className="w-3.5 h-3.5" />
              Our Process
            </span>
            <h2 className="section-heading mb-5 reveal" style={{ transitionDelay: '100ms' }}>
              A Proven <span className="gradient-text">Methodology</span>
            </h2>
            <p className="section-subheading reveal" style={{ transitionDelay: '150ms' }}>
              Every engagement follows a structured, repeatable framework designed to maximize coverage and minimize risk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {/* Connector line for desktop */}
            <div className="hidden lg:block absolute top-[3.5rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

            {process.map((step, index) => (
              <div
                key={index}
                className="text-center relative reveal"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card border border-border/60 mb-5 mx-auto group hover:border-primary/30 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                  <span className="absolute -top-2 -right-2 text-[10px] font-bold text-primary bg-background border border-primary/20 rounded-full w-6 h-6 flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px] mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="premium-card p-10 md:p-16 text-center relative overflow-hidden reveal">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mx-auto mb-8">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
                Ready to <span className="gradient-text">Secure Your Business</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
                Get a comprehensive security assessment from our expert team. Fast turnaround, actionable insights, enterprise-grade reporting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-primary text-primary-foreground font-semibold text-base px-8 py-6 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 group">
                    <span className="flex items-center gap-2">
                      Schedule Consultation
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border border-border text-foreground font-semibold text-base px-8 py-6 rounded-xl hover:bg-muted/50 transition-colors">
                    Request Free Assessment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
