import { CollectionConfig } from 'payload'

export const SocialMedia: CollectionConfig = {
    slug: 'social-media',
    admin: {
        useAsTitle: 'platform',
        defaultColumns: ['platform', 'scheduledDate', 'posted'],
        group: 'Marketing',
    },
    fields: [
        {
            name: 'platform',
            type: 'select',
            required: true,
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
        },
        {
            name: 'image',
            type: 'relationship',
            relationTo: 'media',
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'scheduledDate',
                    type: 'date',
                    admin: {
                        date: {
                            pickerAppearance: 'dayAndTime',
                        },
                    },
                },
                {
                    name: 'posted',
                    type: 'checkbox',
                    defaultValue: false,
                },
            ],
        },
    ],
}
