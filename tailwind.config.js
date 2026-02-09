/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{js,jsx}',
      './components/**/*.{js,jsx}',
      './app/**/*.{js,jsx}',
      './src/**/*.{js,jsx}',
    ],
    prefix: "",
    theme: {
        container: {
                center: true,
                padding: '2rem',
                screens: {
                        '2xl': '1400px'
                }
        },
        extend: {
                colors: {
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        cyber: {
                                green: '#00ff88',
                                cyan: '#00ffff',
                                blue: '#0088ff',
                                purple: '#aa00ff',
                                dark: '#050505',
                                darker: '#020202',
                                gray: '#0a0a0a'
                        }
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                keyframes: {
                        'accordion-down': {
                                from: { height: '0' },
                                to: { height: 'var(--radix-accordion-content-height)' }
                        },
                        'accordion-up': {
                                from: { height: 'var(--radix-accordion-content-height)' },
                                to: { height: '0' }
                        },
                        'glow-pulse': {
                                '0%, 100%': { 
                                        boxShadow: '0 0 20px rgba(0, 255, 136, 0.3), 0 0 40px rgba(0, 255, 136, 0.1), inset 0 0 20px rgba(0, 255, 136, 0.05)',
                                        transform: 'translateY(0px)'
                                },
                                '50%': { 
                                        boxShadow: '0 0 40px rgba(0, 255, 136, 0.5), 0 0 80px rgba(0, 255, 136, 0.2), inset 0 0 30px rgba(0, 255, 136, 0.1)',
                                        transform: 'translateY(-2px)'
                                }
                        },
                        'float-slow': {
                                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                                '33%': { transform: 'translateY(-20px) rotate(2deg)' },
                                '66%': { transform: 'translateY(-10px) rotate(-2deg)' }
                        },
                        'particle-float': {
                                '0%': { transform: 'translateY(100vh) translateX(0) scale(0)', opacity: '0' },
                                '10%': { opacity: '1' },
                                '90%': { opacity: '1' },
                                '100%': { transform: 'translateY(-100vh) translateX(50px) scale(1)', opacity: '0' }
                        },
                        'grid-pulse': {
                                '0%, 100%': { opacity: '0.1' },
                                '50%': { opacity: '0.3' }
                        },
                        'text-shimmer': {
                                '0%': { backgroundPosition: '0% 50%' },
                                '50%': { backgroundPosition: '100% 50%' },
                                '100%': { backgroundPosition: '0% 50%' }
                        },
                        'scan-line': {
                                '0%': { transform: 'translateY(-100%)' },
                                '100%': { transform: 'translateY(100vh)' }
                        },
                        'tilt': {
                                '0%, 100%': { transform: 'rotateX(0deg) rotateY(0deg)' },
                                '50%': { transform: 'rotateX(5deg) rotateY(5deg)' }
                        },
                        'fade-in-up': {
                                '0%': { opacity: '0', transform: 'translateY(30px)' },
                                '100%': { opacity: '1', transform: 'translateY(0)' }
                        },
                        'scale-in': {
                                '0%': { opacity: '0', transform: 'scale(0.9)' },
                                '100%': { opacity: '1', transform: 'scale(1)' }
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
                        'float-slow': 'float-slow 8s ease-in-out infinite',
                        'particle-float': 'particle-float 15s linear infinite',
                        'grid-pulse': 'grid-pulse 4s ease-in-out infinite',
                        'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
                        'scan-line': 'scan-line 8s linear infinite',
                        'tilt': 'tilt 10s ease-in-out infinite',
                        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
                        'scale-in': 'scale-in 0.5s ease-out forwards'
                },
                backdropBlur: {
                        xs: '2px',
                }
        }
    },
    plugins: [require("tailwindcss-animate")],
  }