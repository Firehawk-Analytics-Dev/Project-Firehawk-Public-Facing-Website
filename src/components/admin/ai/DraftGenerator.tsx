'use client'

import React, { useState, useCallback } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'
import { Button } from '@payloadcms/ui'
import { toast } from 'sonner'
import './ai-lab.scss'

export const DraftGenerator: React.FC = () => {
    // Access the field for the final draft
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { value, setValue } = useField<any>({ path: 'finalDraft' })

    // We need the content plan to generate the draft
    // Note: In Payload RichText is a complex object. We need to serialize it or send safe text.
    // For this MVP, extracting text from the rich text structure is tricky on the client without a serializer.
    // However, since we just generated it, we might grab the raw JSON structure and let the server parse it.
    const contentPlan = useFormFields(([fields]) => fields.contentPlan?.value)

    const [isWriting, setIsWriting] = useState(false)

    const handleWrite = useCallback(async () => {
        if (!contentPlan) {
            toast.error('You need a Content Plan before writing the draft.')
            return
        }

        setIsWriting(true)
        toast.info('The Writer is getting to work... (This may take 30s+)')

        try {
            const response = await fetch('/api/ai/generate-draft', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contentPlan
                }),
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.error || 'Drafting failed')

            // Data.draft should be the full markdown or structured content
            // We'll wrap it in a root node if it's plain text, 
            // or trust the API returned a valid Lexical state.

            const newDraft = {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'paragraph',
                            children: [{ text: data.draft, type: 'text' }]
                        }
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1
                }
            }

            setValue(newDraft)

            // Handle Citations / Grounding Metadata
            // Attempt to switch to the references tab or update the references field directly if we can access it.
            // Since we are in a custom component for 'finalDraft', we can't easily set sibling fields via 'setValue' 
            // unless we have access to the form context's dispatch or use a specific hook.
            // Payload's useForm hook provides 'dispatchFields'.

            if (data.groundingMetadata?.groundingChunks) {
                const references = data.groundingMetadata.groundingChunks
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .filter((chunk: any) => chunk.web?.uri)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map((chunk: any) => ({
                        title: chunk.web?.title || 'Source',
                        url: chunk.web?.uri,
                        sourceName: new URL(chunk.web?.uri).hostname
                    }))

                // We'll use a toast to notify user about citations, 
                // but setting the actual sibling field requires access to the document dispatch 
                // which useField doesn't directly provide for *other* fields.
                // However, we can use window.postMessage or dispatch a custom event if Payload supports it,
                // or just ask the user to save. 
                // A better approach in Payload 3.0 Custom Components:
                // We should really be using `useForm` from `@payloadcms/ui` if available to set other fields.
                // For MVP, we will try to display them or append them to the draft text as a "References" section.

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const citationsText = '\n\n### References\n' + references.map((ref: any) => `- [${ref.title}](${ref.url})`).join('\n')

                // Append to the draft text node for now as a fallback
                newDraft.root.children[0].children[0].text += citationsText
                setValue(newDraft)

                toast.success(`Draft Created with ${references.length} Citations!`)
            } else {
                toast.success('Draft Created!')
            }
        } catch (err) {
            console.error(err)
            toast.error(err instanceof Error ? err.message : 'Error generating draft')
        } finally {
            setIsWriting(false)
        }
    }, [contentPlan, setValue])

    return (
        <div className="ai-strategist-container" style={{ borderColor: '#1a73e8', background: 'linear-gradient(135deg, #e8f0fe 0%, #ffffff 100%)' }}>
            <div className="ai-header">
                <div className="ai-icon" style={{ color: '#1a73e8' }}>✍️</div>
                <div className="ai-title">
                    <h4 style={{ color: '#174ea6' }}>The Writer</h4>
                    <p>Powered by Gemini 1.5 Pro</p>
                </div>
                <Button
                    onClick={handleWrite}
                    disabled={isWriting}
                    className="generate-btn"
                >
                    {isWriting ? 'Writing (High Quality)...' : 'Write Full Draft'}
                </Button>
            </div>

            {!value && (
                <div className="ai-placeholder" style={{ color: '#174ea6', borderColor: '#aecbfa' }}>
                    <p>Once you are happy with the Content Plan above, click &quot;Write Full Draft&quot; to generate the article.</p>
                </div>
            )}
        </div>
    )
}
