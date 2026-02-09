import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BugZero Cyber Solutions | Professional Cybersecurity Services',
  description: 'Professional vulnerability assessment and penetration testing services. We identify security vulnerabilities before attackers do. Focused on prevention, detection, and response.',
  keywords: 'cybersecurity, VAPT, penetration testing, ethical hacking, web security, security consulting, vulnerability assessment',
  authors: [{ name: 'BugZero Cyber Solutions' }],
  openGraph: {
    title: 'BugZero Cyber Solutions',
    description: 'Professional cybersecurity and penetration testing services',
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