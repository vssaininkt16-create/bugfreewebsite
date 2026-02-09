import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BugZero Cyber Solutions | Elite Cybersecurity Services',
  description: 'Building India\'s Next-Generation Cybersecurity Force. Expert VAPT, penetration testing, and security consulting services by elite ethical hackers.',
  keywords: 'cybersecurity, VAPT, penetration testing, ethical hacking, web security, bug bounty, security consulting, India',
  authors: [{ name: 'BugZero Cyber Solutions' }],
  openGraph: {
    title: 'BugZero Cyber Solutions',
    description: 'Elite cybersecurity services and ethical hacking team',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}