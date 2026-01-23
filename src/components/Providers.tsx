'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            storageKey="payload-theme"
        >
            {children}
        </ThemeProvider>
    )
}
