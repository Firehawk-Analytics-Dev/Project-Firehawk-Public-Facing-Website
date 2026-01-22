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
<<<<<<< HEAD
import { Leads } from './collections/Leads'
import { Organisations } from './collections/Organisations'
import { Deals } from './collections/Deals'
import { SocialMedia } from './collections/SocialMedia'
import { authjsPlugin } from 'payload-authjs'
import Google from 'next-auth/providers/google'
=======
>>>>>>> 0a60537ae4406588589c9ad6e83de11ebfaf93c1

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: 'users',
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [
        Users,
        Services,
        Blog,
        Newsletters,
<<<<<<< HEAD
        Organisations,
        Leads,
        Deals,
        SocialMedia,
=======
>>>>>>> 0a60537ae4406588589c9ad6e83de11ebfaf93c1
        {
            slug: 'media',
            upload: true,
            fields: [
                {
                    name: 'alt',
                    type: 'text',
                    required: true,
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
<<<<<<< HEAD
        authjsPlugin({
            authjsConfig: {
                providers: [
                    Google({
                        clientId: process.env.AUTH_GOOGLE_ID || '',
                        clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
                    }),
                ],
                secret: process.env.AUTH_SECRET || '',
            },
        }),
=======
>>>>>>> 0a60537ae4406588589c9ad6e83de11ebfaf93c1
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
<<<<<<< HEAD
            generateTitle: ({ doc }) => {
                const title = (doc as { title?: { value?: string } })?.title?.value
                return `Firehawk Analytics — ${title || ''}`
            },
            generateDescription: ({ doc }) => {
                const desc = (doc as { description?: { value?: string } })?.description?.value
                return desc || ''
            },
=======
            generateTitle: ({ doc }) => `Firehawk Analytics — ${(doc as { title?: { value?: string } })?.title?.value || ''}`,
            generateDescription: ({ doc }) => (doc as { description?: { value?: string } })?.description?.value || '',
>>>>>>> 0a60537ae4406588589c9ad6e83de11ebfaf93c1
        }),
    ],
    email: resendAdapter({
        defaultFromAddress: 'onboarding@resend.dev',
        defaultFromName: 'Firehawk Analytics',
        apiKey: process.env.RESEND_API_KEY || '',
    }),
})
