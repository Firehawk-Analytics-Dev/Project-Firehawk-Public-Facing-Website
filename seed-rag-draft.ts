import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config'

async function seedRAGDraft() {
    const payload = await getPayload({ config })

    console.log('Creating RAG Blog Draft...')

    const draft = await payload.create({
        collection: 'blog-drafts',
        data: {
            topic: 'Optimal Use Cases for RAG (Retrieval-Augmented Generation) in 2026',
            sourceMaterials: [
                {
                    url: 'https://cloud.google.com/use-cases/retrieval-augmented-generation',
                    notes: 'Focus on technical flow: retrieval, augmentation, and generation. Mention factual grounding.'
                },
                {
                    url: 'https://www.chatbees.ai/blog/rag-use-cases',
                    notes: 'Extract 10 practical use cases including healthcare, customer support, and sales enablement.'
                },
                {
                    url: 'https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-retrieval-augmented-generation-rag',
                    notes: 'Emphasize cost-effectiveness vs fine-tuning and the "open-book" analogy.'
                }
            ],
            status: 'ready_to_plan',
        },
    })

    console.log('Draft created with ID:', draft.id)
    process.exit(0)
}

seedRAGDraft().catch((err) => {
    console.error(err)
    process.exit(1)
})
