'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function MouseTracker({ onMouseMove }) {
  const { viewport } = useThree()
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      onMouseMove({ x, y })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [onMouseMove])
  
  return null
}

function AnimatedSphere({ mousePosition }) {
  const meshRef = useRef()
  const materialRef = useRef()
  const targetPosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  
  // Create gradient colors for the glow effect
  const colors = useMemo(() => {
    return {
      primary: new THREE.Color('#00ff88'),
      secondary: new THREE.Color('#00ccff'),
      accent: new THREE.Color('#ff00ff')
    }
  }, [])

  // Update target position when mouse moves
  useEffect(() => {
    if (mousePosition) {
      targetPosition.current = { x: mousePosition.x * 0.8, y: mousePosition.y * 0.8 }
    }
  }, [mousePosition])

  useFrame((state) => {
    if (meshRef.current) {
      // Continuous spinning
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.008
      
      // Smooth lerp to mouse position
      currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * 0.05
      currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * 0.05
      
      meshRef.current.position.x = currentPosition.current.x
      meshRef.current.position.y = currentPosition.current.y
    }
    
    // Animate distortion based on time
    if (materialRef.current) {
      materialRef.current.distort = 0.4 + Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group>
      {/* Main sphere */}
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          ref={materialRef}
          color={colors.primary}
          emissive={colors.primary}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
        />
      </Sphere>
      
      {/* Inner glow sphere */}
      <Sphere args={[1.3, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color={colors.secondary} 
          transparent 
          opacity={0.3}
        />
      </Sphere>
      
      {/* Outer glow shells */}
      <Sphere args={[1.8, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color={colors.primary}
          transparent 
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Animated ring */}
      <RotatingRing mousePosition={mousePosition} />
    </group>
  )
}

function RotatingRing({ mousePosition }) {
  const ringRef = useRef()
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.3
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.5
      ringRef.current.rotation.z = (mousePosition?.x || 0) * 0.3
    }
  })
  
  return (
    <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
      <torusGeometry args={[2.2, 0.02, 16, 100]} />
      <meshBasicMaterial color="#00ff88" transparent opacity={0.6} />
    </mesh>
  )
}

function Particles({ mousePosition }) {
  const particlesRef = useRef()
  const count = 150
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 3
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
      particlesRef.current.rotation.x = (mousePosition?.y || 0) * 0.3
      particlesRef.current.rotation.z = (mousePosition?.x || 0) * 0.3
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00ff88"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function Scene({ mousePosition }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ccff" />
      <pointLight position={[0, 0, 5]} intensity={0.3} color="#ffffff" />
      
      <AnimatedSphere mousePosition={mousePosition} />
      <Particles mousePosition={mousePosition} />
    </>
  )
}

export default function GlowingSphere() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  return (
    <div 
      className="w-full h-full cursor-crosshair"
      style={{ minHeight: '300px' }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <MouseTracker onMouseMove={setMousePosition} />
        <Scene mousePosition={mousePosition} />
      </Canvas>
    </div>
  )
}
