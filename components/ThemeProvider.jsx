'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }) {
    return (
        <NextThemesProvider
            attribute="data-theme"
            defaultTheme="cyberpunk"
            enableSystem={false}
            themes={['light', 'dark', 'cyberpunk', 'aurora']}
            storageKey="bugzero-theme"
            disableTransitionOnChange={false}
        >
            {children}
        </NextThemesProvider>
    )
}
