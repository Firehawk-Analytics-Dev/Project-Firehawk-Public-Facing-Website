import { CollectionConfig } from 'payload'

export const Newsletters: CollectionConfig = {
    slug: 'newsletters',
    admin: {
        useAsTitle: 'subject',
        group: 'Marketing Hub',
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
                position: 'sidebar',
                description: 'Indicates if this newsletter has already been broadcast.',
            },
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'draft',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Scheduled', value: 'scheduled' },
                { label: 'Sent', value: 'sent' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            admin: {
                position: 'sidebar',
                description: 'The person responsible for this content.',
            },
        },
        {
            name: 'scheduledDate',
            type: 'date',
            admin: {
                position: 'sidebar',
                description: 'When this newsletter is set to go out.',
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
    ],
    hooks: {
        afterChange: [
            async ({ doc, previousDoc, req }) => {
                if (doc.status === 'sent' && previousDoc.status !== 'sent') {
                    // Trigger email delivery via Resend
                    try {
                        await req.payload.sendEmail({
                            to: 'subscribers@firehawkanalytics.com.au', // In a real app, fetch from a subscribers collection
                            subject: doc.subject,
                            html: doc.content, // Simplified for now, should use a template
                        });
                        await req.payload.update({
                            collection: 'newsletters',
                            id: doc.id,
                            data: {
                                sent: true,
                            },
                        });
                    } catch (error) {
                        req.payload.logger.error(`Failed to send newsletter: ${error}`);
                    }
                }
            },
        ],
    },
}
