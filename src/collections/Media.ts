import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    upload: {
        staticDir: 'media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 400,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'hero',
                width: 1920,
                height: 1080,
                position: 'centre',
            },
            {
                name: 'og',
                width: 1200,
                height: 630,
                position: 'centre',
            },
            {
                name: 'avatar',
                width: 200,
                height: 200,
                position: 'centre',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
        focalPoint: true,
    },
    admin: {
        group: 'Content Hub',
        useAsTitle: 'alt',
        defaultColumns: ['filename', 'alt', 'mimeType', 'filesize'],
    },
    hooks: {
        beforeChange: [
            ({ data, req }) => {
                // Ensure filename is URL friendly / SEO optimized
                if (data.filename) {
                    // Auto-populate alt text from filename if not provided
                    if (!data.alt) {
                        data.alt = data.filename
                            .split('.')
                            .slice(0, -1)
                            .join(' ')
                            .replace(/[-_]+/g, ' ')
                            .replace(/\b\w/g, (char: string) => char.toUpperCase())
                    }

                    data.filename = data.filename
                        .toLowerCase()
                        .replace(/[^a-z0-9.]+/g, '-')
                        .replace(/(^-|-$)/g, '')
                }
                return data
            },
        ],
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Image Info',
                    fields: [
                        {
                            name: 'alt',
                            type: 'text',
                            required: false,
                            admin: {
                                description: 'Optional. If left blank, it will be auto-populated from the filename.',
                            },
                        },
                        {
                            name: 'caption',
                            type: 'textarea',
                            admin: {
                                description: 'Optional text to display beneath the image.',
                            },
                        },
                    ],
                },
                {
                    label: 'Strategic Metadata',
                    fields: [
                        {
                            name: 'credit',
                            type: 'text',
                            admin: {
                                placeholder: 'Photographer or Source name',
                                description: 'Give credit where it is due.',
                            },
                        },
                        {
                            name: 'license',
                            type: 'select',
                            options: [
                                { label: 'Owned / Internal', value: 'internal' },
                                { label: 'Creative Commons', value: 'cc' },
                                { label: 'Stock (Licensed)', value: 'stock' },
                            ],
                            defaultValue: 'internal',
                        },
                        {
                            name: 'tags',
                            type: 'select',
                            hasMany: true,
                            admin: {
                                description: 'Categorize your assets for faster searching.',
                            },
                            options: [
                                { label: 'Blog Hero', value: 'blog_hero' },
                                { label: 'Service Icon', value: 'service_icon' },
                                { label: 'Team Photo', value: 'team' },
                                { label: 'AI Generated', value: 'ai' },
                                { label: 'Branding', value: 'branding' },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}

