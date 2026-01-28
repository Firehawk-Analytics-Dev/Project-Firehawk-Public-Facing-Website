import { NextResponse } from 'next/server'
import { googleAI } from '@/lib/google-ai'

export async function POST(req: Request) {
    try {
        const { contentPlan } = await req.json()

        if (!contentPlan) {
            return NextResponse.json({ error: 'Content Plan is required' }, { status: 400 })
        }

        // Generate the full draft using Gemini Pro 1.5
        const { text: draft, groundingMetadata } = await googleAI.generateFullDraft(contentPlan)

        return NextResponse.json({ success: true, draft, groundingMetadata })

    } catch (err) {
        console.error('AI Drafting Error:', err)
        return NextResponse.json({ error: 'Failed to generate draft' }, { status: 500 })
    }
}
