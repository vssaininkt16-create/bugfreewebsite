'use client'

import { useEffect, useRef } from 'react'

export default function CyberBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Particles
    const particles = []
    const particleCount = 80

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedY = Math.random() * 0.5 + 0.2
        this.speedX = Math.random() * 0.3 - 0.15
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.y -= this.speedY
        this.x += this.speedX

        if (this.y < 0) {
          this.y = canvas.height
          this.x = Math.random() * canvas.width
        }

        if (this.x < 0 || this.x > canvas.width) {
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = `rgba(0, 255, 136, ${this.opacity})`
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
      />

      {/* Cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 animate-grid-pulse"></div>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-green/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Scanning line effect */}
      <div className="scan-line"></div>

      {/* Holographic lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-green/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent"></div>
    </div>
  )
}