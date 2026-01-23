import { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
    slug: 'blog',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'author', 'publishedDate'],
        group: 'Content',
    },
    labels: {
        singular: 'Blog',
        plural: 'Blogs',
    },
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
            name: 'publishedDate',
            type: 'date',
            required: true,
            defaultValue: () => new Date(),
            admin: {
                description: 'The date this post will be published on the website.',
            },
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            admin: {
                description: 'Select the team member who authored this post.',
            },
        },
        {
            name: 'featuredImage',
            type: 'relationship',
            relationTo: 'media',
            admin: {
                description: 'The hero image that appears at the top of the blog post.',
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
}
