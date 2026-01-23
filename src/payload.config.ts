import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { resendAdapter } from '@payloadcms/email-resend'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Services } from './collections/Services'
import { Blog } from './collections/Blog'
import { Newsletters } from './collections/Newsletters'
import { Leads } from './collections/Leads'
import { Organisations } from './collections/Organisations'
import { Deals } from './collections/Deals'
import { SocialMedia } from './collections/SocialMedia'
import { authjsPlugin } from 'payload-authjs'
import { authConfig } from './auth.config'
// Unused icon imports removed to fix linting errors


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: 'users',
        importMap: {
            baseDir: path.resolve(dirname),
        },
        components: {
            header: [
                {
                    path: '/components/admin/AdminHeader#AdminHeader',
                },
            ],
        },
        meta: {
            titleSuffix: '- Firehawk Analytics',
        },
    },
    routes: {
        admin: '/admin',
        api: '/api/payload',
    },
    collections: [
        Users,
        Services,
        Blog,
        Newsletters,
        Organisations,
        Leads,
        Deals,
        SocialMedia,
        {
            slug: 'media',
            upload: {
                imageSizes: [
                    {
                        name: 'avatar',
                        width: 200,
                        height: 200,
                        position: 'centre',
                    },
                    {
                        name: 'thumbnail',
                        width: 50,
                        height: 50,
                        position: 'centre',
                    },
                ],
                adminThumbnail: 'thumbnail',
            },
            admin: {
                group: 'Content',
            },
            fields: [
                {
                    name: 'alt',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'A descriptive alt text for accessibility and SEO.',
                        placeholder: 'e.g., Firehawk Analytics Team Meeting',
                    },
                },
            ],
        },
    ],
    editor: lexicalEditor({}),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI || '',
        },
    }),
    sharp,
    plugins: [
        authjsPlugin({
            authjsConfig: authConfig,
        }),
        s3Storage({
            collections: {
                media: true,
            },
            bucket: process.env.S3_BUCKET || '',
            config: {
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
                },
                region: process.env.S3_REGION || '',
                endpoint: process.env.S3_ENDPOINT || '',
                forcePathStyle: true,
            },
        }),
        seoPlugin({
            collections: ['services', 'blog'],
            uploadsCollection: 'media',
            generateTitle: ({ doc }) => {
                const title = doc?.title?.value || doc?.title || ''
                return `Firehawk Analytics — ${title}`
            },
            generateDescription: ({ doc }) => {
                const desc = doc?.description?.value || doc?.description || ''
                return desc
            },
        }),
    ],
    email: resendAdapter({
        defaultFromAddress: 'onboarding@resend.dev',
        defaultFromName: 'Firehawk Analytics',
        apiKey: process.env.RESEND_API_KEY || '',
    }),
})
