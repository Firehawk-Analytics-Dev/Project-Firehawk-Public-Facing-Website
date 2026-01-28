import { NextResponse } from 'next/server'
import { googleAI } from '@/lib/google-ai'

export async function POST(req: Request) {
    try {
        const { topic, targetAudience, toneOfVoice, seoKeywords } = await req.json()

        if (!topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
        }

        const plan = await googleAI.generateContentPlan({
            topic,
            audience: targetAudience,
            tone: toneOfVoice,
            keywords: seoKeywords || []
        })

        return NextResponse.json({ success: true, plan })

    } catch (err) {
        console.error('AI Plan Generation Error:', err)
        return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 })
    }
}
