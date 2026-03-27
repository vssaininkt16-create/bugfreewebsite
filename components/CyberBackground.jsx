'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export default function CyberBackground() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const { theme } = useTheme()

  const isCyberpunk = theme === 'cyberpunk'
  const isAurora = theme === 'aurora'
  const isActive = isCyberpunk || isAurora

  useEffect(() => {
    if (!isActive) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Color palette based on theme
    const colors = isCyberpunk
      ? ['rgba(0,255,136,', 'rgba(0,255,255,', 'rgba(0,200,100,']
      : ['rgba(167,92,255,', 'rgba(0,245,208,', 'rgba(200,60,255,', 'rgba(0,160,255,']

    const particleCount = isCyberpunk ? 80 : 100

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * (isAurora ? 2.5 : 2) + 0.5
        this.speedY = Math.random() * 0.5 + 0.15
        this.speedX = Math.random() * 0.4 - 0.2
        this.opacity = Math.random() * 0.55 + 0.15
        this.colorBase = colors[Math.floor(Math.random() * colors.length)]
        // aurora particles twinkle
        this.twinkle = isAurora ? Math.random() * Math.PI * 2 : 0
        this.twinkleSpeed = isAurora ? Math.random() * 0.03 + 0.01 : 0
      }

      update() {
        this.y -= this.speedY
        this.x += this.speedX
        if (isAurora) {
          this.twinkle += this.twinkleSpeed
          this.opacity = 0.2 + Math.abs(Math.sin(this.twinkle)) * 0.5
        }
        if (this.y < 0) {
          this.y = canvas.height
          this.x = Math.random() * canvas.width
        }
        if (this.x < 0 || this.x > canvas.width) {
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        const color = `${this.colorBase}${this.opacity})`
        ctx.shadowBlur = isAurora ? 14 : 10
        ctx.shadowColor = color
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.shadowBlur = 0
      particles.forEach(p => { p.update(); p.draw() })
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isActive, isCyberpunk, isAurora])

  if (!isActive) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />

      {/* Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-full h-full">
        {isCyberpunk && <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-green/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '4s' }}></div>
        </>}
        {isAurora && <>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] rounded-full blur-[100px] animate-float-slow" style={{ background: 'radial-gradient(ellipse, rgba(167,92,255,0.18) 0%, transparent 70%)' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[280px] rounded-full blur-[100px] animate-float-slow" style={{ background: 'radial-gradient(ellipse, rgba(0,245,208,0.14) 0%, transparent 70%)', animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-[350px] h-[250px] rounded-full blur-[90px] animate-float-slow" style={{ background: 'radial-gradient(ellipse, rgba(200,60,255,0.12) 0%, transparent 70%)', animationDelay: '1.5s' }}></div>
        </>}
      </div>

      {/* Scan line */}
      <div className="scan-line"></div>

      {/* Top/bottom accent lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>
    </div>
  )
}