'use client'

import { Shield, Target, Users, Zap, Award, Globe } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CyberBackground from '@/components/CyberBackground'

export default function About() {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize the security and privacy of our clients above all else'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Every vulnerability is identified with surgical precision and detailed reporting'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Elite ethical hackers with years of real-world security experience'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Staying ahead of threats with cutting-edge security research'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering world-class security services'
    },
    {
      icon: Globe,
      title: 'Global Standards',
      description: 'Following international security frameworks and best practices'
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <CyberBackground />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1562813733-b31f71025d54)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-primary">BugZero</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Elite ethical hackers building India's cybersecurity future
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-lg mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-primary">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                At BugZero Cyber Solutions, we are on a mission to build India's next-generation
                cybersecurity force. We believe in ethical hacking as a force for good, protecting
                organizations from evolving cyber threats.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team consists of highly skilled penetration testers, security researchers, and
                ethical hackers who are passionate about making the digital world safer. We combine
                technical expertise with a startup mindset to deliver innovative security solutions.
              </p>
            </div>

            <div className="glass-card p-8 md:p-12 rounded-lg">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What We <span className="text-secondary">Do</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                BugZero specializes in comprehensive cybersecurity services including:
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <span className="text-primary text-xl mt-1">▸</span>
                  <div>
                    <strong className="text-foreground">Vulnerability Assessment & Penetration Testing (VAPT):</strong>
                    <span className="text-muted-foreground"> Comprehensive security testing for web applications, mobile apps, and infrastructure</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary text-xl mt-1">▸</span>
                  <div>
                    <strong className="text-foreground">API Security Testing:</strong>
                    <span className="text-muted-foreground"> Identifying vulnerabilities in REST APIs, GraphQL, and authentication systems</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary text-xl mt-1">▸</span>
                  <div>
                    <strong className="text-foreground">Cloud Security:</strong>
                    <span className="text-muted-foreground"> Securing cloud infrastructure on AWS, Azure, and GCP</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary text-xl mt-1">▸</span>
                  <div>
                    <strong className="text-foreground">Bug Bounty Assistance:</strong>
                    <span className="text-muted-foreground"> Helping organizations run successful bug bounty programs</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary text-xl mt-1">▸</span>
                  <div>
                    <strong className="text-foreground">Security Training:</strong>
                    <span className="text-muted-foreground"> Internship programs with certificate and job opportunities</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <CyberBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-primary">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and define who we are
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="glass-card p-6 rounded-lg hover-lift">
                <div className="p-3 bg-primary/10 rounded-lg inline-block mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The <span className="text-secondary">Team</span>
            </h2>
            <div className="glass-card p-8 md:p-12 rounded-lg mb-8">
              <div
                className="w-full h-64 rounded-lg mb-6 opacity-60"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/6963932/pexels-photo-6963932.jpeg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team is composed of certified ethical hackers, penetration testers, and security
                researchers with extensive experience in the field. We've worked with startups, enterprises,
                and government organizations to secure their digital infrastructure.
              </p>
            </div>
            <p className="text-xl text-muted-foreground">
              We're not just security professionals - we're innovators committed to pushing the
              boundaries of cybersecurity and building the next generation of ethical hackers in India.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}