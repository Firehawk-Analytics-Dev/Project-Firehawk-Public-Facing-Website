'use client'

import React, { useState, useCallback } from 'react'
import { useField, useFormFields, useDocumentInfo } from '@payloadcms/ui'
import { Button } from '@payloadcms/ui'
import { toast } from 'sonner'
import './ai-lab.scss'

export const ContentStrategist: React.FC = () => {
    // Access the current field value (Rich Text for the plan)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { value, setValue } = useField<any>({ path: 'contentPlan' })
    const { id } = useDocumentInfo()

    // Access sibling fields for context
    const topic = useFormFields(([fields]) => fields.topic?.value as string)
    const targetAudience = useFormFields(([fields]) => fields.targetAudience?.value as string)
    const toneOfVoice = useFormFields(([fields]) => fields.toneOfVoice?.value as string)
    const seoKeywords = useFormFields(([fields]) => fields.seoKeywords?.value as string)

    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerate = useCallback(async () => {
        if (!topic) {
            toast.error('Please enter a Topic first.')
            return
        }

        setIsGenerating(true)
        toast.info('Consulting the Strategist...')

        try {
            const response = await fetch('/api/ai/generate-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic,
                    targetAudience: targetAudience || 'General Business Audience',
                    toneOfVoice: toneOfVoice || 'Professional',
                    seoKeywords: seoKeywords ? seoKeywords.split(',').map(k => k.trim()) : []
                }),
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.error || 'Generation failed')

            // Convert Markdown response to Lexical structure (simplified for now)
            // Ideally, we'd parse the markdown into proper nodes, but for a plan, 
            // a simple paragraph block is okay for the MVP, or we can use a server-side parser.
            // For now, we'll trust the API to return a structure or handle it here.

            // For this version, we'll expect the API to return the raw text, 
            // and we'll wrap it in a basic Lexical paragraph node to visualize it.
            // A more advanced version would parse headlines.

            const newContent = {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'paragraph',
                            children: [{ text: data.plan, type: 'text' }]
                        }
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1
                }
            }

            setValue(newContent)
            toast.success('Strategic Plan Generated!')
        } catch (err) {
            console.error(err)
            toast.error(err instanceof Error ? err.message : 'Error generating plan')
        } finally {
            setIsGenerating(false)
        }
    }, [topic, targetAudience, toneOfVoice, seoKeywords, setValue])

    return (
        <div className="ai-strategist-container">
            <div className="ai-header">
                <div className="ai-icon">🧠</div>
                <div className="ai-title">
                    <h4>The Strategist</h4>
                    <p>Powered by Gemini 2.0 Flash</p>
                </div>
                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="generate-btn"
                >
                    {isGenerating ? 'Thinking...' : 'Generate Plan'}
                </Button>
            </div>

            {!value && (
                <div className="ai-placeholder">
                    <p>No plan yet. Enter your topic and audience above, then ask the Strategist to outline your content.</p>
                </div>
            )}
        </div>
    )
}
