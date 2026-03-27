import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import ChatWidget from '@/components/ChatWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BugZero Cyber Solutions | Enterprise Cybersecurity & Penetration Testing',
  description: 'Enterprise-grade vulnerability assessment, penetration testing, API security, and security consulting. We identify and neutralize threats before attackers exploit them.',
  keywords: 'cybersecurity, VAPT, penetration testing, API security, network security, bug bounty, security consulting, vulnerability assessment, enterprise security',
  authors: [{ name: 'BugZero Cyber Solutions' }],
  openGraph: {
    title: 'BugZero Cyber Solutions — Enterprise Cybersecurity',
    description: 'Precision-driven security assessments, penetration testing, and strategic consulting for enterprises.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}