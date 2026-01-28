'use client'

import React, { useState } from 'react'
import { useForm, useFormFields, Button, LoadingOverlay, toast } from '@payloadcms/ui'

export const GenerateBlogContent: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const { dispatchFields } = useForm()

    // Get context from form fields
    const topic = useFormFields(([fields]) => fields.topic?.value as string)
    const aiDraft = useFormFields(([fields]) => fields.aiDraft?.value)

    const handleGenerate = async (mode: 'plan' | 'draft') => {
        if (!topic) {
            toast.error('Please enter a Topic first so the AI has a strategic focus.')
            return
        }

        setLoading(true)
        try {
            // In a real app, this would call /api/generate-blog
            // For now, we simulate the high-fidelity generation
            toast.info(`Consulting Firehawk Intelligence for your ${mode}...`)

            // Simulating API delay
            await new Promise(resolve => setTimeout(resolve, 2500))

            if (mode === 'plan') {
                dispatchFields({
                    type: 'UPDATE',
                    path: 'aiContentPlan',
                    value: {
                        root: {
                            type: 'root',
                            children: [
                                {
                                    type: 'heading',
                                    tag: 'h2',
                                    children: [{ text: 'Executive Summary', type: 'text' }],
                                },
                                {
                                    type: 'paragraph',
                                    children: [{ text: `A strategic deep dive into ${topic}.`, type: 'text' }],
                                },
                                {
                                    type: 'heading',
                                    tag: 'h3',
                                    children: [{ text: 'Key Pillars', type: 'text' }],
                                },
                                {
                                    type: 'list',
                                    listType: 'bullet',
                                    children: [
                                        { type: 'listitem', children: [{ text: 'Pillar 1: Economic Impact', type: 'text' }] },
                                        { type: 'listitem', children: [{ text: 'Pillar 2: Technological Headwinds', type: 'text' }] },
                                        { type: 'listitem', children: [{ text: 'Pillar 3: The Firehawk View', type: 'text' }] },
                                    ],
                                },
                            ],
                            direction: 'ltr',
                            format: '',
                            indent: 0,
                            version: 1,
                        }
                    },
                })
                toast.success('Strategic Plan generated!')
            } else {
                dispatchFields({
                    type: 'UPDATE',
                    path: 'aiDraft',
                    value: {
                        root: {
                            type: 'root',
                            children: [
                                {
                                    type: 'paragraph',
                                    children: [{ text: `In the rapidly evolving landscape of ${topic}, Firehawk Analytics has identified key vectors for growth...`, type: 'text' }],
                                },
                                {
                                    type: 'heading',
                                    tag: 'h2',
                                    children: [{ text: 'The Strategic Advantage', type: 'text' }],
                                },
                                {
                                    type: 'paragraph',
                                    children: [{ text: 'By leveraging vertical AI and proprietary datasets, firms can now achieve 10x defensibility...', type: 'text' }],
                                },
                            ],
                            direction: 'ltr',
                            format: '',
                            indent: 0,
                            version: 1,
                        }
                    },
                })
                toast.success('High-Fidelity Draft completed!')
            }
        } catch (err) {
            console.error('Generation Error:', err)
            toast.error('Failed to generate content.')
        } finally {
            setLoading(false)
        }
    }

    const promoteToEditor = () => {
        if (!aiDraft) {
            toast.error('No AI Draft found to promote.')
            return
        }

        dispatchFields({
            type: 'UPDATE',
            path: 'content',
            value: aiDraft,
        })
        toast.success('AI Draft promoted to the main Editor!')
    }

    return (
        <div style={{
            marginBottom: '30px',
            padding: '24px',
            border: '2px solid var(--theme-elevation-200)',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--theme-elevation-50)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--brand-blue)' }}>🔥 Firehawk AI Assistant</h4>
            <p style={{ fontSize: '14px', color: 'var(--theme-text-secondary)', marginBottom: '20px' }}>
                Transform your topic into a market-leading intelligence report.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <Button onClick={() => handleGenerate('plan')} disabled={loading} buttonStyle="secondary">
                    {loading ? 'Synthesizing...' : '📜 Generate Strategic Plan'}
                </Button>
                <Button onClick={() => handleGenerate('draft')} disabled={loading} buttonStyle="primary">
                    {loading ? 'Drafting...' : '✍️ Generate High-Fidelity Draft'}
                </Button>
            </div>

            {!!aiDraft && (
                <div style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--theme-elevation-200)'
                }}>
                    <Button onClick={promoteToEditor} buttonStyle="primary">
                        🚀 Promote Draft to Main Editor
                    </Button>
                    <p style={{ fontSize: '11px', color: 'var(--theme-text-tertiary)', marginTop: '8px' }}>
                        Warning: This will overwrite current content in the Editor tab.
                    </p>
                </div>
            )}

            {loading && <LoadingOverlay />}
        </div>
    )
}
