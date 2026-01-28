import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config'

async function generateFinalDraft() {
    const payload = await getPayload({ config })

    console.log('Generating Final Draft for RAG Blog...')

    const finalDraftContent = {
        root: {
            type: 'root',
            children: [
                {
                    type: 'heading',
                    tag: 'h2',
                    children: [{ text: 'The Open-Book Revolution: Why RAG is the Final Frontier of Enterprise AI', type: 'text' }]
                },
                {
                    type: 'paragraph',
                    children: [
                        { text: 'In the early days of the Generative AI boom, businesses faced a stark choice: rely on a "closed-book" model with a knowledge cutoff (like GPT-4) or spend millions of dollars fine-tuning a custom model. ', type: 'text' },
                        { text: 'Retrieval-Augmented Generation (RAG)', bold: true, type: 'text' },
                        { text: ' has effectively ended that dilemma. By allowing AI to "look up" facts in real-time before answering, RAG transforms hallucinations into high-fidelity intelligence.', type: 'text' }
                    ]
                },
                {
                    type: 'heading',
                    tag: 'h3',
                    children: [{ text: 'How RAG Works: The Strategic Infrastructure', type: 'text' }]
                },
                {
                    type: 'paragraph',
                    children: [
                        { text: 'At its core, RAG works like an open-book exam. Instead of depending solely on what it learned during training, the AI uses a three-step process:', type: 'text' }
                    ]
                },
                {
                    type: 'list',
                    listType: 'number',
                    children: [
                        {
                            type: 'listitem',
                            children: [
                                { text: 'Retrieval:', bold: true, type: 'text' },
                                { text: ' When a query is made, the system searches a vector database for relevant "chunks" of your private business data.', type: 'text' }
                            ]
                        },
                        {
                            type: 'listitem',
                            children: [
                                { text: 'Augmentation:', bold: true, type: 'text' },
                                { text: ' Those chunks are added to the AI\'s prompt, providing it with the necessary context and raw facts.', type: 'text' }
                            ]
                        },
                        {
                            type: 'listitem',
                            children: [
                                { text: 'Generation:', bold: true, type: 'text' },
                                { text: ' The AI generates a response grounded in those specific facts, often citing the exact source document.', type: 'text' }
                            ]
                        }
                    ]
                },
                {
                    type: 'heading',
                    tag: 'h3',
                    children: [{ text: 'Top Business Use Cases for 2026', type: 'text' }]
                },
                {
                    type: 'paragraph',
                    children: [
                        { text: 'According to research from McKinsey and Google Cloud, the most impactful implementations of RAG are currently found in:', type: 'text' }
                    ]
                },
                {
                    type: 'list',
                    listType: 'bullet',
                    children: [
                        {
                            type: 'listitem',
                            children: [
                                { text: 'Intelligent Customer Support:', bold: true, type: 'text' },
                                { text: ' Reducing resolution times by 40% by giving agents instant access to complex policy manuals and customer history.', type: 'text' }
                            ]
                        },
                        {
                            type: 'listitem',
                            children: [
                                { text: 'Enterprise Knowledge Search:', bold: true, type: 'text' },
                                { text: ' Breaking down data silos by allowing employees to query internal wikis, Slack, and PDFs as if they were a single brain.', type: 'text' }
                            ]
                        },
                        {
                            type: 'listitem',
                            children: [
                                { text: 'Strategic Market Intelligence:', bold: true, type: 'text' },
                                { text: ' Automating the monitoring of competitor shifts and market news to generate real-time briefings.', type: 'text' }
                            ]
                        }
                    ]
                },
                {
                    type: 'paragraph',
                    children: [
                        { text: 'For companies building for long-term defensibility, RAG is no longer an experiment—it is the standard for reliable, enterprise-grade AI.', type: 'text' }
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
    const content = finalDraftContent as any;

    await payload.update({
        collection: 'blog-drafts',
        id: '1',
        data: {
            finalDraft: content,
            status: 'completed',
        },
    })

    console.log('Final Draft generated and status set to completed.')
    process.exit(0)
}

generateFinalDraft().catch((err) => {
    console.error(err)
    process.exit(1)
})
