import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config'

interface LexicalNode {
    type?: string;
    text?: string;
    children?: LexicalNode[];
    indent?: number;
    format?: any;
    version?: number;
    [key: string]: unknown;
}

async function fixBlogIndent() {
    const payload = await getPayload({ config })

    console.log('Fixing Lexical indent issues in Blog posts...')

    const result = await payload.find({
        collection: 'blog',
    })

    for (const post of result.docs) {
        const content = post.content as { root?: LexicalNode } | null;
        if (content && content.root) {
            // Recursively add indent: 0, format: '', version: 1 to all block-level nodes
            const fixNodes = (node: LexicalNode) => {
                if (node.type !== 'text' && node.type !== 'root') {
                    if (node.indent === undefined) node.indent = 0
                    if (node.format === undefined) node.format = ''
                    if (node.version === undefined) node.version = 1
                }
                if (node.children) {
                    node.children.forEach(fixNodes)
                }
            }

            fixNodes(content.root)

            await payload.update({
                collection: 'blog',
                id: post.id,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data: {
                    content: { ...content },
                } as any,
            })
            console.log(`Fixed post: ${post.title}`)
        }
    }

    process.exit(0)
}

fixBlogIndent().catch((err) => {
    console.error(err)
    process.exit(1)
})
