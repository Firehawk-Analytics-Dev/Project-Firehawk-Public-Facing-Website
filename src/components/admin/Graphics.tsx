import React from 'react'

/**
 * FIREHAWK ANALYTICS - PREMIUM BRAND IDENTITY
 * High-fidelity SVG recreation of the official Firehawk "F" mark
 * featuring the brand gradient and pixel-perfect geometry.
 */

export const Logo: React.FC = () => {
    return (
        <div className="custom-logo" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '4px 0'
        }}>
            <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="firehawk-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#EC5934" />
                        <stop offset="50%" stopColor="#AF92FF" />
                        <stop offset="100%" stopColor="#3F20B9" />
                    </linearGradient>
                </defs>
                <path d="M40 10L70 40L40 70L10 40L40 10Z" fill="url(#firehawk-gradient)" />
                <path d="M60 30L90 60L60 90L30 60L60 30Z" fill="url(#firehawk-gradient)" />
            </svg>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{
                    fontWeight: '900',
                    fontSize: '18px',
                    color: 'var(--theme-text)',
                    letterSpacing: '-0.6px',
                    lineHeight: '1',
                    fontFamily: 'Outfit, sans-serif'
                }}>
                    Firehawk
                </span>
                <span style={{
                    fontSize: '9px',
                    fontWeight: '800',
                    color: 'var(--brand-orange)',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                    opacity: '0.9'
                }}>
                    Analytics
                </span>
            </div>
        </div>
    )
}

export const Icon: React.FC = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Using Brand Orange for the Admin Icon to match user preference */}
            <path d="M40 10L70 40L40 70L10 40L40 10Z" fill="#EC5934" />
            <path d="M60 30L90 60L60 90L30 60L60 30Z" fill="#EC5934" />
        </svg>
    )
}
