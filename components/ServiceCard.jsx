'use client'

import { Shield } from 'lucide-react'

export default function ServiceCard({ icon: Icon, title, description, features }) {
  return (
    <div className="glass hover-glow rounded-lg p-6 transition-all duration-300 group">
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-cyber-green/10 rounded-lg group-hover:bg-cyber-green/20 transition-colors">
          <Icon className="w-8 h-8 text-cyber-green" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-400 mb-4">{description}</p>
      {features && features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-gray-300">
              <span className="text-cyber-green mt-1">▸</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}