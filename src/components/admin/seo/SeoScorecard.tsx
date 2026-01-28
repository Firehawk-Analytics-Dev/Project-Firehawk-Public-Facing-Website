'use client'

import React, { useState, useEffect } from 'react'
import { useFormFields } from '@payloadcms/ui'
import { Button } from '@payloadcms/ui'
import { toast } from 'sonner'
import '../ai/ai-lab.scss'

export const SeoScorecard: React.FC = () => {
    // We need to watch the finalDraft and seoKeywords
    const finalDraft = useFormFields(([fields]) => fields.finalDraft?.value)
    const seoKeywords = useFormFields(([fields]) => fields.seoKeywords?.value as string)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [analysis, setAnalysis] = useState<any>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    // Helper to extract text from Rich Text structure
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extractText = (node: any): string => {
        if (!node) return ''
        if (typeof node === 'string') return node
        if (node.text) return node.text
        if (node.children) return node.children.map(extractText).join(' ')
        if (node.root) return extractText(node.root)
        return ''
    }

    const handleAnalyze = async () => {
        if (!finalDraft || !seoKeywords) {
            toast.error('Draft content and SEO Keywords are required for analysis.')
            return
        }

        setIsAnalyzing(true)
        const contentText = extractText(finalDraft)

        try {
            const response = await fetch('/api/ai/analyze-seo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: contentText,
                    keywords: seoKeywords.split(',').map(k => k.trim())
                }),
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Analysis failed')

            setAnalysis(data.analysis)
            toast.success('SEO Analysis Complete')
        } catch (err) {
            console.error(err)
            toast.error('Failed to analyze SEO')
        } finally {
            setIsAnalyzing(false)
        }
    }

    return (
        <div className="ai-strategist-container" style={{ borderColor: '#34a853', background: 'linear-gradient(135deg, #e6f4ea 0%, #ffffff 100%)' }}>
            <div className="ai-header">
                <div className="ai-icon" style={{ color: '#34a853' }}>🎯</div>
                <div className="ai-title">
                    <h4 style={{ color: '#0d652d' }}>SEO Scorecard</h4>
                    <p>Real-time optimization feedback</p>
                </div>
                <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="generate-btn"
                // style={{ backgroundColor: '#34a853' }} // Removed to avoid lint error, handle in CSS if needed or accept default blue for now
                >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze SEO'}
                </Button>
            </div>

            {analysis && (
                <div className="seo-results" style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <div style={{
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            color: analysis.score > 80 ? '#34a853' : analysis.score > 50 ? '#fbbc04' : '#ea4335',
                            marginRight: '15px'
                        }}>
                            {analysis.score}
                        </div>
                        <div>
                            <strong>SEO Health Score</strong>
                            <div style={{ fontSize: '0.85rem', color: '#666' }}>Keyword Density: {analysis.keywordDensity}</div>
                            <div style={{ fontSize: '0.85rem', color: '#666' }}>Readability: {analysis.readability}</div>
                        </div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.8)', padding: '15px', borderRadius: '8px' }}>
                        <strong style={{ display: 'block', marginBottom: '8px', color: '#444' }}>💡 Integration Suggestions:</strong>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#555' }}>
                            {analysis.suggestions?.map((s: string, i: number) => (
                                <li key={i} style={{ marginBottom: '4px' }}>{s}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}
