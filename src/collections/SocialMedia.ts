import { CollectionConfig } from 'payload'

export const SocialMedia: CollectionConfig = {
    slug: 'social-media',
    admin: {
        useAsTitle: 'platform',
        defaultColumns: ['platform', 'scheduledDate', 'posted'],
        group: 'Marketing Hub',
    },
    labels: {
        singular: 'Social Post',
        plural: 'Social Posts',
    },
    fields: [
        {
            name: 'platform',
            type: 'select',
            required: true,
            admin: {
                description: 'Choose the social network for this post.',
            },
            options: [
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'X (Twitter)', value: 'x' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Facebook', value: 'facebook' },
            ],
        },
        {
            name: 'content',
            type: 'textarea',
            required: true,
            admin: {
                placeholder: 'Write your post content here...',
                description: 'The text that will be posted to the selected platform.',
            },
        },
        {
            name: 'image',
            type: 'relationship',
            relationTo: 'media',
            admin: {
                description: 'Attach a visual asset to this post.',
            },
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'scheduledDate',
                    type: 'date',
                    admin: {
                        description: 'When should this post go live?',
                        date: {
                            pickerAppearance: 'dayAndTime',
                        },
                    },
                },
                {
                    name: 'posted',
                    type: 'checkbox',
                    defaultValue: false,
                    admin: {
                        description: 'Indicates if this post has been successfully shared.',
                    },
                },
            ],
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            admin: {
                position: 'sidebar',
                description: 'The person who created this post.',
            },
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'draft',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Scheduled', value: 'scheduled' },
                { label: 'Posted', value: 'posted' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
    ],
}
