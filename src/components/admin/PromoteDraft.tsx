'use client'

import React, { useState } from 'react'
import { useDocumentInfo, Button, LoadingOverlay, toast } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'

export const PromoteDraft: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const { id } = useDocumentInfo()
    const router = useRouter()

    const handlePromote = async () => {
        if (!id) return

        setLoading(true)
        try {
            const res = await fetch('/api/promote-draft', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ draftId: id }),
            })

            const data = await res.json()

            if (data.success) {
                toast.success('Draft successfully promoted to Live Blog!')
                // Force a refresh to show the link to the generated blog
                router.refresh()
            } else {
                throw new Error(data.error || 'Promotion failed')
            }
        } catch (err) {
            console.error('Promotion Error:', err)
            const message = err instanceof Error ? err.message : 'Error promoting draft.'
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ marginBottom: '20px', padding: '20px', border: '2px solid var(--theme-success)', borderRadius: 'var(--radius-lg)', background: 'var(--theme-success-light)', opacity: 0.9 }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'var(--theme-success)' }}>Ready for Launch?</h4>
            <p style={{ fontSize: '13px', color: 'var(--theme-text)', marginBottom: '15px' }}>
                Promote this AI-crafted intelligence to the primary Strategic Intel portal. All images and citations will be transferred.
            </p>
            <Button
                onClick={handlePromote}
                disabled={loading}
                buttonStyle="primary"
            >
                {loading ? 'Launching Strategic Intel...' : '🚀 Promote to Live Blog'}
            </Button>
            {loading && <LoadingOverlay />}
        </div>
    )
}
