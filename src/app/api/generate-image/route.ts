import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { prompt, topic } = await req.json()

        if (!process.env.GOOGLE_API_KEY) {
            return NextResponse.json({ error: 'GOOGLE_API_KEY is not configured in .env' }, { status: 500 })
        }

        const payload = await getPayload({ config })

        // 1. Generate the image using Google Imagen 4.0 (Latest high-fidelity)
        // Using models/imagen-4.0-generate-001 which we verified is available via v1beta predict
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${process.env.GOOGLE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                instances: [
                    {
                        prompt: `A premium, high-end professional 3D illustration or cinematic photo for a business blog titled "${topic}". Style: Modern enterprise, tech-forward, using a palette of deep navy (#3F20B9) and vibrant orange (#EC5934). No text in the image. High fidelity, 16:9 aspect ratio. Additional context: ${prompt}`
                    }
                ],
                parameters: {
                    sampleCount: 1,
                    aspectRatio: "16:9"
                }
            })
        })

        const data = await response.json() as { predictions?: Array<{ bytesBase64Encoded: string }>; error?: { message: string } };

        if (data.error) {
            throw new Error(`Google AI Error: ${data.error.message}`)
        }

        const base64Image = data.predictions?.[0]?.bytesBase64Encoded
        if (!base64Image) {
            console.error('Full response from Google:', JSON.stringify(data, null, 2))
            throw new Error('No image was returned. Your region might not support Imagen generation via API key yet.')
        }

        const buffer = Buffer.from(base64Image, 'base64')

        // 2. Create Media in Payload
        const mediaDoc = await payload.create({
            collection: 'media',
            data: {
                alt: `Strategic Intel: ${topic}`,
            },
            file: {
                data: buffer,
                name: `firehawk-intel-${Date.now()}.png`,
                mimetype: 'image/png',
                size: buffer.length,
            },
        })

        return NextResponse.json({ success: true, mediaId: mediaDoc.id, url: mediaDoc.url })
    } catch (err) {
        console.error('Generation Error:', err)
        const message = err instanceof Error ? err.message : 'Unknown error'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
