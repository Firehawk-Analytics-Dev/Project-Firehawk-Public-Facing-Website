import { CollectionConfig } from 'payload'

export const Deals: CollectionConfig = {
    slug: 'deals',
    admin: {
        useAsTitle: 'dealName',
        defaultColumns: ['dealName', 'associatedWith', 'stage', 'value', 'expectedCloseDate'],
        group: 'CRM',
    },
    labels: {
        singular: 'Deal',
        plural: 'Deals',
    },
    fields: [
        {
            name: 'dealName',
            type: 'text',
            required: true,
            admin: {
                placeholder: 'e.g., Enterprise Site Audit - Acme Corp',
                description: 'A descriptive name for the business opportunity.',
            },
        },
        {
            name: 'associatedWith',
            type: 'relationship',
            relationTo: ['leads', 'organisations'],
            required: true,
            label: 'Lead or Organisation',
            admin: {
                description: 'The primary contact or company for this deal.',
                placeholder: 'Search leads or organisations...',
            },
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'value',
                    type: 'number',
                    admin: {
                        placeholder: 'e.g., 5000',
                        description: 'Total estimated value of the deal in AUD.',
                    },
                },
                {
                    name: 'stage',
                    type: 'select',
                    defaultValue: 'discovery',
                    required: true,
                    admin: {
                        description: 'Current progress of the deal.',
                    },
                    options: [
                        { label: '🔍 Discovery', value: 'discovery' },
                        { label: '📄 Proposal', value: 'proposal' },
                        { label: '🤝 Negotiation', value: 'negotiation' },
                        { label: '✅ Won', value: 'won' },
                        { label: '❌ Lost', value: 'lost' },
                    ],
                },
            ],
        },
        {
            name: 'expectedCloseDate',
            type: 'date',
            admin: {
                description: 'When do you expect to close this deal?',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            admin: {
                placeholder: 'Provide more context about the deal requirements...',
            },
        },
    ],
}
