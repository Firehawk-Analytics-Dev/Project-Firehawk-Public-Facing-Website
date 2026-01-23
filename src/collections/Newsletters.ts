import { CollectionConfig } from 'payload'

export const Newsletters: CollectionConfig = {
    slug: 'newsletters',
    admin: {
        useAsTitle: 'subject',
    },
    labels: {
        singular: 'Newsletter',
        plural: 'Newsletters',
    },
    fields: [
        {
            name: 'subject',
            type: 'text',
            required: true,
            admin: {
                placeholder: 'e.g., Weekly Insights: Why Data Matters in 2026',
                description: 'The email subject line as it will appear in subscribers\' inboxes.',
            },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
            admin: {
                description: 'The main body content of your newsletter.',
            },
        },
        {
            name: 'sent',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                readOnly: true,
                description: 'Indicates if this newsletter has already been broadcast.',
            },
        },
    ],
    hooks: {
        // We'll add a hook here later to trigger Resend email delivery
    },
}
