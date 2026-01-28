import { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
    slug: 'leads',
    admin: {
        useAsTitle: 'lastName',
        defaultColumns: ['firstName', 'lastName', 'email', 'status', 'createdAt'],
        group: 'CRM & Sales',
    },
    labels: {
        singular: 'Lead',
        plural: 'Leads',
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
                                    admin: {
                                        placeholder: 'John',
                                    },
                                },
                                {
                                    name: 'lastName',
                                    type: 'text',
                                    required: true,
                                    admin: {
                                        placeholder: 'Smith',
                                    },
                                },
                            ],
                        },
                        {
                            name: 'email',
                            type: 'email',
                            required: true,
                            admin: {
                                placeholder: 'john.smith@company.com',
                                description: 'Primary contact email for this lead.',
                            },
                        },
                        {
                            name: 'phone',
                            type: 'text',
                            admin: {
                                placeholder: '+61 400 000 000',
                            },
                        },
                        {
                            name: 'organisation',
                            type: 'relationship',
                            relationTo: 'organisations',
                            admin: {
                                description: 'Which company does this lead belong to?',
                                placeholder: 'Search organisations...',
                            },
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
                            admin: {
                                description: 'Current stage in the lead lifecycle.',
                            },
                            options: [
                                { label: '📝 New', value: 'new' },
                                { label: '📞 Contacted', value: 'contacted' },
                                { label: '✅ Qualified', value: 'qualified' },
                                { label: '❌ Lost', value: 'lost' },
                            ],
                        },
                        {
                            name: 'notes',
                            type: 'textarea',
                            admin: {
                                placeholder: 'Add any relevant context or interaction notes here...',
                            },
                        },
                    ],
                },
            ],
        },
    ],
}
