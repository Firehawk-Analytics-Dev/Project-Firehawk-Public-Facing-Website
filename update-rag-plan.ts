import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config'

async function updateRAGPlan() {
    const payload = await getPayload({ config })

    console.log('Updating RAG Draft with AI Plan...')

    // Lexical structure for the plan
    const planContent = {
        root: {
            type: 'root',
            children: [
                {
                    type: 'heading',
                    tag: 'h2',
                    children: [{ text: 'Proposed Blog Structure: The RAG Advantage', type: 'text' }]
                },
                {
                    type: 'list',
                    listType: 'bullet',
                    children: [
                        {
                            type: 'listitem',
                            children: [{ text: 'Hook: Why static AI is a risk (Knowledge cutoff & Hallucinations).', type: 'text' }]
                        },
                        {
                            type: 'listitem',
                            children: [{ text: 'Explainer: RAG as an "Open-Book" exam for LLMs.', type: 'text' }]
                        },
                        {
                            type: 'listitem',
                            children: [{ text: 'The Mechanics: A 3-step visualization (Ingest -> Retrieve -> Augment).', type: 'text' }]
                        },
                        {
                            type: 'listitem',
                            children: [{ text: 'Deep Dive: 3 High-Impact Business Use Cases (Support, Strategy, Engineering).', type: 'text' }]
                        },
                        {
                            type: 'listitem',
                            children: [{ text: 'Trust & ROI: Why RAG beats Fine-tuning for 90% of enterprises.', type: 'text' }]
                        }
                    ]
                }
            ],
            direction: 'ltr' as const,
            format: '',
            indent: 0,
            version: 1
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content = planContent as any;

    await payload.update({
        collection: 'blog-drafts',
        id: '1',
        data: {
            contentPlan: content,
            status: 'plan_ready',
        },
    })

    console.log('Plan updated successfully.')
    process.exit(0)
}

updateRAGPlan().catch((err) => {
    console.error(err)
    process.exit(1)
})
