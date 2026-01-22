import { CollectionConfig } from 'payload'

export const Organisations: CollectionConfig = {
    slug: 'organisations',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'industry', 'website', 'createdAt'],
        group: 'CRM',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'industry',
                    type: 'text',
                },
                {
                    name: 'website',
                    type: 'text',
                },
            ],
        },
        {
            name: 'description',
            type: 'textarea',
        },
    ],
}
