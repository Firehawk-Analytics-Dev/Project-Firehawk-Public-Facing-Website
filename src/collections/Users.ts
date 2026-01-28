import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'name',
        group: 'Administration',
        defaultColumns: ['name', 'email'],
    },
    labels: {
        singular: 'User',
        plural: 'Users',
    },
    hooks: {
        beforeChange: [
            async ({ data, req }) => {
                if (data.avatar) {
                    try {
                        const media = await req.payload.findByID({
                            collection: 'media',
                            id: data.avatar,
                        })
                        if (media) {
                            const sizes = media.sizes as Record<string, { url?: string | null }> | undefined
                            const avatarUrl = sizes?.avatar?.url || media.url
                            if (avatarUrl) {
                                data.image = avatarUrl
                            }
                        }
                    } catch (error) {
                        console.error('Error syncing avatar image:', error)
                    }
                }
                return data
            },
        ],
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            admin: {
                description: 'Full name of the user.',
            },
        },
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
            admin: {
                position: 'sidebar',
                description: 'User profile picture.',
            },
        },
    ],
}
