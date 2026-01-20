import { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
    slug: 'blog',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'publishedDate',
            type: 'date',
            required: true,
            defaultValue: () => new Date(),
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
        {
            name: 'featuredImage',
            type: 'relationship',
            relationTo: 'media',
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
    ],
}
