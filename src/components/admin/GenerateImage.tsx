'use client'

import React, { useState } from 'react'
import { useForm, useFormFields, Button, LoadingOverlay } from '@payloadcms/ui'
import { toast } from '@payloadcms/ui'

export const GenerateImage: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const { dispatchFields } = useForm()

    // Get the current value from either 'title' (Blog collection) or 'topic' (Drafts collection)
    const contextTitle = useFormFields(([fields]) => (fields.title?.value || fields.topic?.value) as string)

    const handleGenerate = async () => {
        if (!contextTitle) {
            toast.error('Please enter a title/topic first so the AI has context.')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('/api/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic: contextTitle,
                    prompt: 'A sleek, professional enterprise hero image.',
                }),
            })

            const data = await res.json()

            if (data.success && data.mediaId) {
                // Update the featuredImage field in the form
                dispatchFields({
                    type: 'UPDATE',
                    path: 'featuredImage',
                    value: data.mediaId,
                })
                toast.success('AI Hero Image generated and assigned!')
            } else {
                throw new Error(data.error || 'Failed to generate image')
            }
        } catch (err) {
            console.error('Generation Error:', err)
            const message = err instanceof Error ? err.message : 'Error generating image.'
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ marginBottom: '20px', padding: '20px', border: '2px dashed var(--theme-elevation-200)', borderRadius: 'var(--radius-lg)', background: 'var(--theme-elevation-50)' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>AI Visual Identity</h4>
            <p style={{ fontSize: '13px', color: 'var(--theme-text-secondary)', marginBottom: '15px' }}>
                Use our proprietary AI to generate a premium brand-aligned hero image based on your topic.
            </p>
            <Button
                onClick={handleGenerate}
                disabled={loading}
                buttonStyle="secondary"
            >
                {loading ? 'Consulting Firehawk AI...' : '✨ Generate Magic Hero Image'}
            </Button>
            {loading && <LoadingOverlay />}
        </div>
    )
}
