import { CollectionConfig } from 'payload'

export const Organisations: CollectionConfig = {
    slug: 'organisations',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'industry', 'website', 'createdAt'],
        group: 'CRM & Sales',
    },
    labels: {
        singular: 'Organisation',
        plural: 'Organisations',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            admin: {
                placeholder: 'e.g., Firehawk Analytics',
                description: 'The legal or trading name of the company.',
            },
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'industry',
                    type: 'text',
                    admin: {
                        placeholder: 'e.g., Marketing, FinTech',
                    },
                },
                {
                    name: 'website',
                    type: 'text',
                    admin: {
                        placeholder: 'e.g., https://firehawkanalytics.com.au',
                    },
                },
            ],
        },
        {
            name: 'description',
            type: 'textarea',
            admin: {
                placeholder: 'Brief overview of what the company does...',
            },
        },
    ],
}
