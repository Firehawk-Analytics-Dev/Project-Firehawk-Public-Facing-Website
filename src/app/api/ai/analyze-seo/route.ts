import { NextResponse } from 'next/server'
import { googleAI } from '@/lib/google-ai'

export async function POST(req: Request) {
    try {
        const { content, keywords } = await req.json()

        if (!content) {
            return NextResponse.json({ error: 'Content is required' }, { status: 400 })
        }

        const analysis = await googleAI.analyzeSEO(content, keywords || [])

        return NextResponse.json({ success: true, analysis })

    } catch (err) {
        console.error('AI SEO Analysis Error:', err)
        return NextResponse.json({ error: 'Failed to analyze content' }, { status: 500 })
    }
}
