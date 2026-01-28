'use client'

import React, { ChangeEvent } from 'react'
import { useField, FieldLabel, TextInput } from '@payloadcms/ui'

export const ColorPicker: React.FC<{ path: string; label: string; required?: boolean }> = ({ path, label, required }) => {
    const { value, setValue } = useField<string>({ path })

    return (
        <div className="field-type text admin-field-group">
            <FieldLabel label={label} required={required} />
            <div style={{
                display: 'flex',
                gap: 'var(--space-2)',
                alignItems: 'stretch',
                height: '42px'
            }}>
                <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid var(--theme-elevation-200)',
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0,
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'border-color var(--transition-fast)'
                }}>
                    <input
                        type="color"
                        value={value || '#000000'}
                        onChange={(e) => setValue(e.target.value)}
                        style={{
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            cursor: 'pointer',
                            border: 'none',
                            background: 'none',
                            padding: 0
                        }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <TextInput
                        path={path}
                        value={value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                        style={{
                            margin: 0,
                            height: '100%',
                            fontFamily: 'monospace',
                            fontWeight: '600'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
