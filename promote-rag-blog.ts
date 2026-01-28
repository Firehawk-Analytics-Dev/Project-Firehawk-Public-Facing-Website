import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config'

async function promoteDraft() {
    const payload = await getPayload({ config })

    console.log('Promoting RAG Draft to Live Blog...')

    // 1. Fetch the draft
    const draftResult = await payload.findByID({
        collection: 'blog-drafts',
        id: '1',
    })

    if (!draftResult) {
        console.error('Draft not found.')
        process.exit(1)
    }

    // 2. Prepare the references
    const references = [
        {
            title: 'What is Retrieval-Augmented Generation (RAG)?',
            url: 'https://cloud.google.com/use-cases/retrieval-augmented-generation',
            sourceName: 'Google Cloud'
        },
        {
            title: 'Top 10 RAG Use Cases and 17 Essential Tools',
            url: 'https://www.chatbees.ai/blog/rag-use-cases',
            sourceName: 'ChatBees'
        },
        {
            title: 'What is retrieval-augmented generation?',
            url: 'https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-retrieval-augmented-generation-rag',
            sourceName: 'McKinsey & Company'
        }
    ]

    // 3. Create the Blog Post
    // @ts-expect-error
    const blogPost = await payload.create({
        collection: 'blog',
        data: {
            title: draftResult.topic,
            slug: 'optimal-use-cases-for-rag-2026',
            description: 'A strategic deep-dive into Retrieval-Augmented Generation (RAG), its technical architecture, and the high-impact business use cases transforming enterprise AI in 2026.',
            publishedDate: new Date().toISOString(),
            author: 'cb905695-350d-4f4b-b9a4-ede20b64cfdd',
            content: draftResult.finalDraft || undefined,
            references: references,
        },
    })

    console.log('Blog post created with ID:', blogPost.id)

    // 4. Update the draft with the relationship
    await payload.update({
        collection: 'blog-drafts',
        id: '1',
        data: {
            generatedBlog: blogPost.id,
        },
    })

    console.log('Promotion complete!')
    process.exit(0)
}

promoteDraft().catch((err) => {
    console.error(err)
    process.exit(1)
})
