'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, Zap, ChevronDown, Sparkles } from 'lucide-react'

const themes = [
    {
        id: 'light',
        label: 'Light',
        icon: Sun,
        description: 'Clean & professional',
    },
    {
        id: 'dark',
        label: 'Dark',
        icon: Moon,
        description: 'Easy on the eyes',
    },
    {
        id: 'cyberpunk',
        label: 'Cyberpunk',
        icon: Zap,
        description: 'Neon & futuristic',
    },
    {
        id: 'aurora',
        label: 'Aurora',
        icon: Sparkles,
        description: 'Midnight aurora borealis',
    },
]

export default function ThemeSwitcher() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Close on Escape
    useEffect(() => {
        function handleEscape(event) {
            if (event.key === 'Escape') setIsOpen(false)
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    // Prevent hydration mismatch: render placeholder until mounted
    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />
        )
    }

    const currentTheme = themes.find((t) => t.id === theme) || themes[2]
    const CurrentIcon = currentTheme.icon

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger button */}
            <button
                id="theme-switcher-btn"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:bg-accent text-foreground transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Switch theme"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <CurrentIcon className="w-4 h-4 text-primary" />
                <span className="hidden lg:inline text-sm font-medium">
                    {currentTheme.label}
                </span>
                <ChevronDown
                    className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border bg-card shadow-xl z-[100] overflow-hidden animate-fade-in-up"
                    role="listbox"
                    aria-label="Select theme"
                >
                    <div className="p-1.5">
                        {themes.map((t) => {
                            const Icon = t.icon
                            const isActive = theme === t.id

                            return (
                                <button
                                    key={t.id}
                                    id={`theme-option-${t.id}`}
                                    role="option"
                                    aria-selected={isActive}
                                    onClick={() => {
                                        setTheme(t.id)
                                        setIsOpen(false)
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-foreground hover:bg-accent'
                                        }`}
                                >
                                    <div
                                        className={`p-1.5 rounded-md ${isActive
                                            ? 'bg-primary/20'
                                            : 'bg-muted'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium">{t.label}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {t.description}
                                        </div>
                                    </div>
                                    {isActive && (
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
