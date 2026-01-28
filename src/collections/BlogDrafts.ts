import { CollectionConfig } from 'payload'

export const BlogDrafts: CollectionConfig = {
    slug: 'blog-drafts',
    admin: {
        useAsTitle: 'topic',
        group: 'AI Lab',
        hidden: false,
        defaultColumns: ['topic', 'status', 'updatedAt'],
    },
    labels: {
        singular: 'Blog Draft Generator',
        plural: 'Blog Draft Generators',
    },
    fields: [
        {
            name: 'topic',
            type: 'text',
            required: true,
            admin: {
                placeholder: 'e.g., The impact of AI on small business defensibility in 2026',
                description: 'The core topic or thesis of the blog post.',
            },
        },
        {
            name: 'sourceMaterials',
            type: 'array',
            required: true,
            admin: {
                description: 'Provide URLs or snippets from third-party sources, news, or other blogs.',
            },
            fields: [
                {
                    name: 'url',
                    type: 'text',
                    admin: {
                        placeholder: 'https://example.com/source',
                    },
                },
                {
                    name: 'notes',
                    type: 'textarea',
                    admin: {
                        placeholder: 'Key takeaways or specific quotes to include.',
                    },
                },
            ],
        },
        {
            name: 'featuredImage',
            type: 'relationship',
            relationTo: 'media',
            admin: {
                description: 'The AI-generated or manually selected hero image.',
            },
        },
        {
            name: 'visualGenerator',
            type: 'ui',
            admin: {
                components: {
                    Field: '@/components/admin/GenerateImage#GenerateImage',
                },
            },
        },
        {
            name: 'promoteAction',
            type: 'ui',
            admin: {
                components: {
                    Field: '@/components/admin/PromoteDraft#PromoteDraft',
                },
            },
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'ready_to_plan',
            options: [
                { label: 'Ready to Plan', value: 'ready_to_plan' },
                { label: 'Planning in Progress', value: 'planning' },
                { label: 'Plan Ready', value: 'plan_ready' },
                { label: 'Drafting in Progress', value: 'drafting' },
                { label: 'Draft Completed', value: 'completed' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'contentPlan',
            type: 'richText',
            admin: {
                description: 'The AI-generated structural plan for the blog.',
            },
        },
        {
            name: 'finalDraft',
            type: 'richText',
            admin: {
                description: 'The final AI-generated copy, including citations.',
            },
        },
        {
            name: 'generatedBlog',
            type: 'relationship',
            relationTo: 'blog',
            admin: {
                position: 'sidebar',
                description: 'The resulting live blog post.',
                readOnly: true,
            },
        },
        {
            name: 'references',
            type: 'array',
            admin: {
                description: 'Authoritative sources extracted by AI during research.',
            },
            fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
                { name: 'sourceName', type: 'text', required: true },
            ],
        },
    ],
}
