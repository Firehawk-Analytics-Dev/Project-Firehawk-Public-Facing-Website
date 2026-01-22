import { CollectionConfig } from 'payload'

export const Deals: CollectionConfig = {
    slug: 'deals',
    admin: {
        useAsTitle: 'dealName',
        defaultColumns: ['dealName', 'associatedWith', 'stage', 'value', 'expectedCloseDate'],
        group: 'CRM',
    },
    fields: [
        {
            name: 'dealName',
            type: 'text',
            required: true,
        },
        {
            name: 'associatedWith',
            type: 'relationship',
            relationTo: ['leads', 'organisations'],
            required: true,
            label: 'Lead or Organisation',
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'value',
                    type: 'number',
                    admin: {
                        placeholder: 'Deal Value (e.g. 5000)',
                    },
                },
                {
                    name: 'stage',
                    type: 'select',
                    defaultValue: 'discovery',
                    required: true,
                    options: [
                        { label: 'Discovery', value: 'discovery' },
                        { label: 'Proposal', value: 'proposal' },
                        { label: 'Negotiation', value: 'negotiation' },
                        { label: 'Won', value: 'won' },
                        { label: 'Lost', value: 'lost' },
                    ],
                },
            ],
        },
        {
            name: 'expectedCloseDate',
            type: 'date',
        },
        {
            name: 'description',
            type: 'textarea',
        },
    ],
}
