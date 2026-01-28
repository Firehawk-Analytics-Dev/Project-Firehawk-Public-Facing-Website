import { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
    slug: 'services',
    admin: {
        useAsTitle: 'title',
        group: 'Marketing Hub',
    },
    labels: {
        singular: 'Service',
        plural: 'Services',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            admin: {
                placeholder: 'e.g., Data-Driven Marketing Strategy',
                description: 'The name of the service offered by Firehawk Analytics.',
            },
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                placeholder: 'e.g., data-driven-marketing-strategy',
                description: 'The unique URL segment for this service page.',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            admin: {
                placeholder: 'A concise summary of how this service helps clients...',
                description: 'Appears in service cards and previews on the website.',
            },
        },
        {
            name: 'icon',
            type: 'text',
            label: 'Icon (Lucide name or Emoji)',
            admin: {
                placeholder: 'e.g., LayoutPanelLeft or 🚀',
                description: 'The visual icon associated with this service.',
            },
        },
        {
            name: 'content',
            type: 'richText',
            admin: {
                description: 'Detailed content for the service landing page.',
            },
        },
    ],
}
