import { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
    slug: 'blog',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'author', 'publishedDate'],
        group: 'Content Hub',
    },
    hooks: {
        beforeChange: [
            ({ data, req }) => {
                if (data.title && !data.slug) {
                    data.slug = data.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '')
                }
                return data
            },
        ],
    },
    labels: {
        singular: 'Blog',
        plural: 'Blogs',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Editor',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            required: true,
                            admin: {
                                placeholder: 'e.g., Why Data-Driven Marketing Strategy is Your Secret Weapon',
                                description: 'The title of your blog post as it will appear on the website.',
                            },
                        },
                        {
                            name: 'slug',
                            type: 'text',
                            required: true,
                            unique: true,
                            admin: {
                                placeholder: 'e.g., why-data-driven-marketing-strategy',
                                description: 'The unique URL segment for this post (auto-generated from title).',
                            },
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                            required: true,
                            admin: {
                                placeholder: 'e.g., A deep dive into the strategic advantages of data-driven marketing in the 2026 landscape.',
                                description: 'A brief summary of the post used for SEO and listing previews.',
                            },
                        },
                        {
                            name: 'content',
                            type: 'richText',
                            required: true,
                            admin: {
                                description: 'The main body content of your blog post.',
                            },
                        },
                    ],
                },
                {
                    label: 'Research & AI Assist',
                    fields: [
                        {
                            name: 'topic',
                            type: 'text',
                            admin: {
                                placeholder: 'e.g., The vertical integration of AI in Venture Capital',
                                description: 'The core prompt or thesis for the AI Assistant.',
                            },
                        },
                        {
                            name: 'sourceMaterials',
                            type: 'array',
                            admin: {
                                description: 'URLs or quotes that the AI should analyze.',
                            },
                            fields: [
                                { name: 'url', type: 'text' },
                                { name: 'notes', type: 'textarea' },
                            ],
                        },
                        {
                            name: 'blogGenerator',
                            type: 'ui',
                            admin: {
                                components: {
                                    Field: '@/components/admin/GenerateBlogContent#GenerateBlogContent',
                                },
                            },
                        },
                        {
                            name: 'aiContentPlan',
                            type: 'richText',
                            admin: {
                                description: 'The generated outline and strategic framing.',
                            },
                        },
                        {
                            name: 'aiDraft',
                            type: 'richText',
                            admin: {
                                description: 'The unprocessed AI draft.',
                            },
                        },
                        {
                            name: 'references',
                            type: 'array',
                            admin: {
                                description: 'Extracted citations for high-authority linking.',
                            },
                            fields: [
                                { name: 'title', type: 'text', required: true },
                                { name: 'url', type: 'text', required: true },
                                { name: 'sourceName', type: 'text', required: true },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'publishedDate',
            type: 'date',
            required: true,
            defaultValue: () => new Date(),
            admin: {
                position: 'sidebar',
                description: 'The date this post will be published.',
            },
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            admin: {
                position: 'sidebar',
                description: 'Select the author.',
            },
        },
        {
            name: 'featuredImage',
            type: 'relationship',
            relationTo: 'media',
            admin: {
                position: 'sidebar',
                description: 'The hero image for the post.',
            },
        },
        {
            name: 'visualGenerator',
            type: 'ui',
            admin: {
                position: 'sidebar',
                components: {
                    Field: '@/components/admin/GenerateImage#GenerateImage',
                },
            },
        },
    ],
}
