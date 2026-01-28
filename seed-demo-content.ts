import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config'

async function seed() {
    console.log('--- Starting Demo Content Seed ---')
    const payload = await getPayload({ config })
    const authorId = '0a21114b-2ff4-4ff6-89bc-8228883a81db'

    // 1. Create a placeholder Media item
    // A 1x1 transparent pixel png
    const buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64')

    console.log('Creating placeholder media...')
    const media = await payload.create({
        collection: 'media',
        data: {
            alt: 'Hero Placeholder',
        },
        file: {
            data: buffer,
            name: 'placeholder-hero.png',
            mimetype: 'image/png',
            size: buffer.length,
        },
    })
    console.log(`Media created: ${media.id}`)

    // 2. Seed 3 Blogs
    const blogPosts = [
        {
            title: 'Behavioral Analytics: The New Frontier of Competitive Advantage',
            description: 'Why understanding user psychology is the master key to building defensible business moats in 2026.',
            topic: 'Behavioral Analytics',
            slug: 'behavioral-analytics-competitive-advantage'
        },
        {
            title: 'The Engineering of Defensibility: Systems over Features',
            description: 'How to build architecture that competitors can\'t copy. Moving beyond MVP to high-fidelity stability.',
            topic: 'Strategic Engineering',
            slug: 'engineering-defensibility-systems-over-features'
        },
        {
            title: 'AI Native Strategy: Beyond Chatbots',
            description: 'Operationalizing large language models as core strategic assets rather than just interface tools.',
            topic: 'AI Strategy',
            slug: 'ai-native-strategy-beyond-chatbots'
        }
    ]

    console.log('Seeding 3 blog posts...')
    for (const post of blogPosts) {
        const lexicalContent = {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'heading',
                        tag: 'h2',
                        children: [{ text: post.title, type: 'text', version: 1 }],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1
                    },
                    {
                        type: 'paragraph',
                        children: [
                            { text: post.description, type: 'text', version: 1 }
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1
                    },
                    {
                        type: 'paragraph',
                        children: [
                            { text: 'In today\'s rapidly evolving market, the traditional "business moat" is no longer enough. We must look towards behavioral dynamics and high-fidelity systems to ensure long-term survivability.', type: 'text', version: 1 }
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1
                    }
                ],
                direction: 'ltr' as 'ltr',
                format: '' as '',
                indent: 0,
                version: 1
            }
        }

        await payload.create({
            collection: 'blog',
            data: {
                title: post.title,
                slug: post.slug,
                description: post.description,
                content: lexicalContent,
                author: authorId,
                featuredImage: media.id,
                publishedDate: new Date().toISOString(),
                topic: post.topic,
            },
        })
    }
    console.log('Blogs seeded successfully.')

    // 3. Seed Newsletters
    console.log('Seeding newsletters...')
    const newsletters = [
        {
            subject: 'Strategic Intelligence Update: 2026 Q1 Roadmap',
            content: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'paragraph',
                            children: [{ text: 'Welcome to our first Q1 update. We are focusing on system stability and RAG implementation across all member portals.', type: 'text', version: 1 }],
                            direction: 'ltr',
                            format: '',
                            indent: 0,
                            version: 1
                        }
                    ],
                    direction: 'ltr' as 'ltr',
                    format: '' as '',
                    indent: 0,
                    version: 1
                }
            }
        },
        {
            subject: 'Member Spotlight: How Apex Corp Built Defensive Data Loops',
            content: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'paragraph',
                            children: [{ text: 'Case study on Apex Corp\'s journey through digital transformation and behavioral integration.', type: 'text', version: 1 }],
                            direction: 'ltr',
                            format: '',
                            indent: 0,
                            version: 1
                        }
                    ],
                    direction: 'ltr' as 'ltr',
                    format: '' as '',
                    indent: 0,
                    version: 1
                }
            }
        }
    ]

    for (const news of newsletters) {
        await payload.create({
            collection: 'newsletters',
            data: {
                subject: news.subject,
                content: news.content,
                author: authorId,
                status: 'draft',
            },
        })
    }
    console.log('Newsletters seeded.')

    // 4. Seed Social Media Posts
    console.log('Seeding social posts...')
    const socialPosts = [
        {
            platform: 'linkedin' as const,
            content: 'Defensibility is not about one great feature. It is about the systemic integration of data, user psychology, and engineering excellence. #StrategicIntelligence #Firehawk',
        },
        {
            platform: 'x' as const,
            content: 'The era of "MVP" is dead. Long live high-fidelity, defensible systems. 🦅🔥 #AI #Fintech #Engineering',
        }
    ]

    for (const sp of socialPosts) {
        await payload.create({
            collection: 'social-media',
            data: {
                platform: sp.platform,
                content: sp.content,
                author: authorId,
                status: 'scheduled',
                scheduledDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            },
        })
    }
    console.log('Social posts seeded.')

    console.log('--- Seeding Complete ---')
    process.exit(0)
}

seed().catch(err => {
    console.error('Seed Error:', err)
    process.exit(1)
})
