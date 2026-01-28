import { GlobalConfig } from 'payload'

export const Branding: GlobalConfig = {
    slug: 'branding',
    admin: {
        group: 'Administration',
        description: 'Global brand identity settings for the Firehawk Strategic Intel platform.',
    },
    fields: [
        {
            name: 'siteTitle',
            type: 'text',
            defaultValue: 'Firehawk Analytics',
            required: true,
        },
        {
            name: 'tagline',
            type: 'text',
            defaultValue: 'Strategic Venture Advisor',
            admin: {
                description: 'The primary tagline used across the admin panel and public metadata.',
            },
        },
        {
            name: 'primaryLogo',
            label: 'Horizontal Logo (Wordmark)',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'The horizontal brand logo with the full "Firehawk Analytics" text.',
                components: {
                    Field: '@/components/admin/PhotoUpload#PhotoUpload',
                }
            },
        },
        {
            name: 'symbol',
            label: 'Vertical Logo (Symbol)',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'The geometric "F" mark symbol used for social media and icons.',
                components: {
                    Field: '@/components/admin/PhotoUpload#PhotoUpload',
                }
            },
        },
        {
            name: 'favicon',
            label: 'Favicon',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'The small square icon appearing in browser tabs.',
                components: {
                    Field: '@/components/admin/PhotoUpload#PhotoUpload',
                }
            },
        },
        {
            name: 'colors',
            type: 'group',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'primary',
                            type: 'text',
                            defaultValue: '#3F20B9',
                            admin: {
                                width: '33%',
                                description: 'Blue',
                                components: {
                                    Field: '@/components/admin/ColorPicker#ColorPicker',
                                },
                            }
                        },
                        {
                            name: 'accent',
                            type: 'text',
                            defaultValue: '#EC5934',
                            admin: {
                                width: '33%',
                                description: 'Orange',
                                components: {
                                    Field: '@/components/admin/ColorPicker#ColorPicker',
                                },
                            }
                        },
                        {
                            name: 'purple',
                            type: 'text',
                            defaultValue: '#AF92FF',
                            admin: {
                                width: '33%',
                                components: {
                                    Field: '@/components/admin/ColorPicker#ColorPicker',
                                },
                            }
                        },
                    ]
                },
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'midBlue',
                            type: 'text',
                            defaultValue: '#3776EC',
                            admin: {
                                width: '33%',
                                components: {
                                    Field: '@/components/admin/ColorPicker#ColorPicker',
                                },
                            }
                        },
                        {
                            name: 'lightBlue',
                            type: 'text',
                            defaultValue: '#B1C8FF',
                            admin: {
                                width: '33%',
                                components: {
                                    Field: '@/components/admin/ColorPicker#ColorPicker',
                                },
                            }
                        },
                        {
                            name: 'peach',
                            type: 'text',
                            defaultValue: '#FFB1A0',
                            admin: {
                                width: '33%',
                                components: {
                                    Field: '@/components/admin/ColorPicker#ColorPicker',
                                },
                            }
                        },
                    ]
                },
                {
                    label: 'Infographic Colors',
                    type: 'collapsible',
                    fields: [
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'magenta',
                                    type: 'text',
                                    defaultValue: '#B22873',
                                    admin: {
                                        width: '33%',
                                        components: {
                                            Field: '@/components/admin/ColorPicker#ColorPicker',
                                        },
                                    }
                                },
                                {
                                    name: 'pink',
                                    type: 'text',
                                    defaultValue: '#FF5BAA',
                                    admin: {
                                        width: '33%',
                                        components: {
                                            Field: '@/components/admin/ColorPicker#ColorPicker',
                                        },
                                    }
                                },
                                {
                                    name: 'yellow',
                                    type: 'text',
                                    defaultValue: '#FFCF4B',
                                    admin: {
                                        width: '33%',
                                        components: {
                                            Field: '@/components/admin/ColorPicker#ColorPicker',
                                        },
                                    }
                                },
                            ]
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'lime',
                                    type: 'text',
                                    defaultValue: '#58B848',
                                    admin: {
                                        width: '33%',
                                        components: {
                                            Field: '@/components/admin/ColorPicker#ColorPicker',
                                        },
                                    }
                                },
                                {
                                    name: 'darkGreen',
                                    type: 'text',
                                    defaultValue: '#00664C',
                                    admin: {
                                        width: '33%',
                                        components: {
                                            Field: '@/components/admin/ColorPicker#ColorPicker',
                                        },
                                    }
                                },
                                {
                                    name: 'mint',
                                    type: 'text',
                                    defaultValue: '#84D8C9',
                                    admin: {
                                        width: '33%',
                                        components: {
                                            Field: '@/components/admin/ColorPicker#ColorPicker',
                                        },
                                    }
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ],
}
