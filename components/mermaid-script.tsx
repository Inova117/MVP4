// Mermaid Script Component - Add to layout or page
'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// Extend Window interface for Mermaid
declare global {
    interface Window {
        mermaid?: {
            initialize: (config: Record<string, unknown>) => void
        }
    }
}

export function MermaidScript() {
    useEffect(() => {
        // Initialize Mermaid after script loads
        if (typeof window !== 'undefined' && window.mermaid) {
            window.mermaid.initialize({
                startOnLoad: true,
                theme: 'default',
                securityLevel: 'loose',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif'
            })
        }
    }, [])

    return (
        <Script
            src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
            strategy="lazyOnload"
            onLoad={() => {
                if (window.mermaid) {
                    window.mermaid.initialize({
                        startOnLoad: true,
                        theme: 'default',
                        securityLevel: 'loose',
                        fontFamily: 'ui-sans-serif, system-ui, sans-serif'
                    })
                }
            }}
        />
    )
}
