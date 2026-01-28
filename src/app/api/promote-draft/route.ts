import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

interface LexicalNode {
    type?: string;
    indent?: number;
    format?: string;
    version?: number;
    children?: LexicalNode[];
    [key: string]: unknown;
}

export async function POST(req: Request) {
    try {
        const { draftId } = await req.json()
        const payload = await getPayload({ config })

        // 1. Fetch the Draft
        const draft = await payload.findByID({
            collection: 'blog-drafts',
            id: draftId,
        })

        if (!draft) {
            return NextResponse.json({ error: 'Draft not found' }, { status: 404 })
        }

        if (!draft.finalDraft) {
            return NextResponse.json({ error: 'Draft is not completed. Generate the final copy first.' }, { status: 400 })
        }

        // 2. Map Draft to Blog Post
        // Note: We use the topic as the title and slugify it
        const slug = (draft.topic as string)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

        // Helper to normalize Lexical properties (fixes the "Invalid indent" error)
        const normalizeLexical = (node: LexicalNode) => {
            if (node.type !== 'text' && node.type !== 'root') {
                if (node.indent === undefined) node.indent = 0
                if (node.format === undefined) node.format = ''
                if (node.version === undefined) node.version = 1
            }
            if (node.children) node.children.forEach(normalizeLexical)
        }

        const finalDraftTyped = draft.finalDraft as { root?: LexicalNode } | null;
        if (finalDraftTyped && finalDraftTyped.root) {
            normalizeLexical(finalDraftTyped.root)
        }

        // Use a safe property access for references
        const draftTyped = draft as { references?: unknown[] };

        const blogData: Record<string, unknown> = {
            title: draft.topic,
            slug: slug,
            description: `Deep dive into ${draft.topic}. Research-backed strategic intelligence by Firehawk Analytics.`,
            publishedDate: new Date().toISOString(),
            content: draft.finalDraft,
            author: 'cb905695-350d-4f4b-b9a4-ede20b64cfdd', // Chris Blyth (Default admin)
            references: draftTyped.references || [],
        }

        // Capture the Featured Image if it exists
        if (draft.featuredImage) {
            blogData.featuredImage = typeof draft.featuredImage === 'object' && draft.featuredImage !== null ? (draft.featuredImage as { id: string | number }).id : draft.featuredImage
        }

        let blogPost;

        if (draft.generatedBlog) {
            // Update existing blog post if it was already promoted
            const blogId = typeof draft.generatedBlog === 'object' && draft.generatedBlog !== null ? (draft.generatedBlog as { id: string | number }).id : (draft.generatedBlog as string | number);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const updateData = blogData as any;

            blogPost = await payload.update({
                collection: 'blog',
                id: blogId,
                data: updateData,
            })
        } else {
            // 3. Create a new live Blog Post
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const createData = blogData as any;

            blogPost = await payload.create({
                collection: 'blog',
                data: createData,
            })

            // 4. Update the Draft to link to the new blog
            await payload.update({
                collection: 'blog-drafts',
                id: draftId,
                data: {
                    generatedBlog: blogPost.id,
                },
            })
        }

        return NextResponse.json({
            success: true,
            blogId: blogPost.id,
            blogUrl: `/blog/${blogPost.slug}`
        })
    } catch (err) {
        console.error('Promotion Error:', err)
        const message = err instanceof Error ? err.message : 'Unknown error'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
