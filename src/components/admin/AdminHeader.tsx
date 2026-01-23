'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAuth, useConfig } from '@payloadcms/ui'
import { User, Sun, Moon, Monitor, LogOut, Settings, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export const AdminHeader: React.FC = () => {
    const { user, logOut } = useAuth()
    const { config } = useConfig()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // theme state (Payload manages this internally, but we can provide shortcuts)
    const [theme, setTheme] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('payload-theme') || 'system'
        }
        return 'system'
    })

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = async () => {
        await logOut()
        window.location.href = `${config.routes.admin}/login`
    }

    const changeTheme = (newTheme: string) => {
        // Payload 3.0 handles theme via data-theme attribute on <html>
        // next-themes also uses this if configured.
        document.documentElement.setAttribute('data-theme', newTheme)

        // Save to localStorage using the same key as our Provider
        localStorage.setItem('payload-theme', newTheme)

        // Dispatch a storage event so other tabs/providers can react
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'payload-theme',
            newValue: newTheme,
        }))

        setTheme(newTheme)
        setIsOpen(false)
    }

    return (
        <div className="custom-header">
            <div className="avatar-dropdown" ref={dropdownRef}>
                <div className="avatar-trigger" onClick={() => setIsOpen(!isOpen)}>
                    <div className="avatar-image">
                        {user?.image ? (
                            <img src={user.image as string} alt={user.name as string} />
                        ) : (
                            <div className="avatar-initials">
                                {user?.name ? user.name.charAt(0).toUpperCase() : <User size={20} />}
                            </div>
                        )}
                    </div>
                    <ChevronDown size={14} className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
                </div>

                {isOpen && (
                    <div className="dropdown-menu">
                        <div className="dropdown-user-info">
                            <span className="user-name">{user?.name || 'User'}</span>
                            <span className="user-email">{user?.email}</span>
                        </div>
                        <div className="dropdown-divider" />

                        <Link href={`${config.routes.admin}/account`} className="dropdown-item" onClick={() => setIsOpen(false)}>
                            <Settings size={16} />
                            <span>Account Settings</span>
                        </Link>

                        <div className="dropdown-divider" />

                        <div className="dropdown-section-label">Theme</div>
                        <div className="theme-shortcuts">
                            <button
                                className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                                onClick={() => changeTheme('light')}
                                title="Light Mode"
                            >
                                <Sun size={14} />
                            </button>
                            <button
                                className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                                onClick={() => changeTheme('dark')}
                                title="Dark Mode"
                            >
                                <Moon size={14} />
                            </button>
                            <button
                                className={`theme-btn ${theme === 'system' || theme === 'none' ? 'active' : ''}`}
                                onClick={() => changeTheme('system')}
                                title="System Mode"
                            >
                                <Monitor size={14} />
                            </button>
                        </div>

                        <div className="dropdown-divider" />

                        <button onClick={handleLogout} className="dropdown-item logout-btn">
                            <LogOut size={16} />
                            <span>Log out</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
