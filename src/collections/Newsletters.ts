import { CollectionConfig } from 'payload'

export const Newsletters: CollectionConfig = {
    slug: 'newsletters',
    admin: {
        useAsTitle: 'subject',
    },
    fields: [
        {
            name: 'subject',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'sent',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                readOnly: true,
            },
        },
    ],
    hooks: {
        // We'll add a hook here later to trigger Resend email delivery
    },
}
