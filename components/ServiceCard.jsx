'use client'

import { useState } from 'react'

export default function ServiceCard({ icon: Icon, title, description, features }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const tiltX = (y - centerY) / 20
    const tiltY = (centerX - x) / 20
    
    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div 
      className="relative group perspective-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="glass-card hover-lift rounded-xl p-6 transition-all duration-500 relative overflow-hidden"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(20px)`
        }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/0 to-cyber-cyan/0 group-hover:from-cyber-green/10 group-hover:to-cyber-cyan/10 transition-all duration-500 rounded-xl"></div>
        
        {/* Border glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
             style={{ boxShadow: '0 0 30px rgba(0, 255, 136, 0.3), inset 0 0 30px rgba(0, 255, 136, 0.1)' }}>
        </div>

        <div className="relative z-10">
          {/* Icon */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative p-4 bg-cyber-green/10 rounded-xl group-hover:bg-cyber-green/20 transition-all duration-300 group-hover:scale-110">
              <Icon className="w-8 h-8 text-cyber-green" />
              {/* Icon glow */}
              <div className="absolute inset-0 bg-cyber-green/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyber-green transition-colors duration-300">{title}</h3>
          </div>
          
          {/* Description */}
          <p className="text-gray-400 mb-4 leading-relaxed">{description}</p>
          
          {/* Features */}
          {features && features.length > 0 && (
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-start space-x-3 text-sm text-gray-300 group/item hover:text-cyber-green transition-colors duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-cyber-green mt-1 text-base group-hover/item:scale-125 transition-transform duration-300">▸</span>
                  <span className="flex-1">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cyber-green/30 rounded-tl-xl group-hover:border-cyber-green/60 transition-colors duration-500"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cyber-cyan/30 rounded-br-xl group-hover:border-cyber-cyan/60 transition-colors duration-500"></div>
      </div>
    </div>
  )
}