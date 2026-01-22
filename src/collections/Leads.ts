import { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
    slug: 'leads',
    admin: {
        useAsTitle: 'lastName',
        defaultColumns: ['firstName', 'lastName', 'email', 'status', 'createdAt'],
        group: 'CRM',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Contact Info',
                    fields: [
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'firstName',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'lastName',
                                    type: 'text',
                                    required: true,
                                },
                            ],
                        },
                        {
                            name: 'email',
                            type: 'email',
                            required: true,
                        },
                        {
                            name: 'phone',
                            type: 'text',
                        },
                        {
                            name: 'organisation',
                            type: 'relationship',
                            relationTo: 'organisations',
                        },
                    ],
                },
                {
                    label: 'Status & Notes',
                    fields: [
                        {
                            name: 'status',
                            type: 'select',
                            defaultValue: 'new',
                            required: true,
                            options: [
                                { label: 'New', value: 'new' },
                                { label: 'Contacted', value: 'contacted' },
                                { label: 'Qualified', value: 'qualified' },
                                { label: 'Lost', value: 'lost' },
                            ],
                        },
                        {
                            name: 'notes',
                            type: 'textarea',
                        },
                    ],
                },
            ],
        },
    ],
}
