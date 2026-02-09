'use client'

import { useState } from 'react'
import { Mail, Linkedin, MapPin, Phone, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CyberBackground from '@/components/CyberBackground'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      // Submit contact form
      const contactResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!contactResponse.ok) {
        throw new Error('Failed to submit contact form')
      }

      // Upload logo if provided
      if (logoFile) {
        const formDataUpload = new FormData()
        formDataUpload.append('logo', logoFile)
        formDataUpload.append('email', formData.email)

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formDataUpload
        })

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload logo')
        }
      }

      setStatus({
        type: 'success',
        message: 'Message sent successfully! We\'ll get back to you soon.'
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
      setLogoFile(null)
      setLogoPreview(null)
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <CyberBackground />
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In <span className="text-cyber-green">Touch</span>
            </h1>
            <p className="text-xl text-gray-400">
              Let's discuss how we can secure your digital assets
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Contact <span className="text-cyber-cyan">Information</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Have questions about our services or want to discuss a security project? 
                Our team is here to help. Reach out through any of the channels below.
              </p>

              <div className="space-y-6">
                <div className="glass p-4 rounded-lg flex items-start space-x-4 hover-glow">
                  <Mail className="w-6 h-6 text-cyber-green mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:contact@bugzero.com" className="text-gray-400 hover:text-cyber-green transition-colors">
                      contact@bugzero.com
                    </a>
                  </div>
                </div>

                <div className="glass p-4 rounded-lg flex items-start space-x-4 hover-glow">
                  <Linkedin className="w-6 h-6 text-cyber-cyan mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">LinkedIn</h3>
                    <a 
                      href="https://www.linkedin.com/in/vishal-saini-b32782321/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyber-cyan transition-colors"
                    >
                      Connect with us on LinkedIn
                    </a>
                  </div>
                </div>

                <div className="glass p-4 rounded-lg flex items-start space-x-4 hover-glow">
                  <MapPin className="w-6 h-6 text-cyber-green mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-gray-400">India</p>
                  </div>
                </div>

                <div className="glass p-4 rounded-lg flex items-start space-x-4 hover-glow">
                  <Phone className="w-6 h-6 text-cyber-cyan mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Support</h3>
                    <p className="text-gray-400">24/7 Emergency Response Available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              {status.message && (
                <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
                  status.type === 'success' ? 'bg-cyber-green/20 border border-cyber-green/50' : 'bg-red-500/20 border border-red-500/50'
                }`}>
                  {status.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-cyber-green" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={status.type === 'success' ? 'text-cyber-green' : 'text-red-400'}>
                    {status.message}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-300 mb-2 block">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-black/50 border-cyber-green/30 focus:border-cyber-green text-white"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-300 mb-2 block">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-black/50 border-cyber-green/30 focus:border-cyber-green text-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-300 mb-2 block">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-black/50 border-cyber-green/30 focus:border-cyber-green text-white"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-300 mb-2 block">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="bg-black/50 border-cyber-green/30 focus:border-cyber-green text-white resize-none"
                    placeholder="Tell us about your security needs..."
                  />
                </div>

                <div>
                  <Label htmlFor="logo" className="text-gray-300 mb-2 block">Upload Logo (Optional)</Label>
                  <div className="border-2 border-dashed border-cyber-green/30 rounded-lg p-6 text-center hover:border-cyber-green/50 transition-colors">
                    <input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                    <label htmlFor="logo" className="cursor-pointer">
                      {logoPreview ? (
                        <div className="space-y-4">
                          <img src={logoPreview} alt="Logo preview" className="max-h-32 mx-auto" />
                          <p className="text-sm text-cyber-green">Click to change logo</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="w-12 h-12 text-cyber-green mx-auto" />
                          <p className="text-gray-400">Click to upload your company logo</p>
                          <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-cyber-green text-black hover:bg-cyber-cyan hover:text-black font-bold text-lg py-6"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}