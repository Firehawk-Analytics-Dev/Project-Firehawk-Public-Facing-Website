import { postgresAdapter } from '@payloadcms/db-postgres'
// Force build refresh for admin UI v2
import { lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'
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
import { BlogDrafts } from './collections/BlogDrafts'
import { Newsletters } from './collections/Newsletters'
import { Leads } from './collections/Leads'
import { Organisations } from './collections/Organisations'
import { Deals } from './collections/Deals'
import { SocialMedia } from './collections/SocialMedia'
import { Media } from './collections/Media'
import { Branding } from './globals/Branding'
import { authjsPlugin } from 'payload-authjs'
import { authConfig } from './auth.config'

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
            graphics: {
                Icon: '/components/admin/Graphics#Icon',
                Logo: '/components/admin/Graphics#Logo',
            },
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
        BlogDrafts,
        Newsletters,
        Organisations,
        Leads,
        Deals,
        SocialMedia,
        Media,
    ],
    globals: [
        Branding,
    ],
    editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
            ...defaultFeatures,
            UploadFeature({
                collections: {
                    media: {
                        fields: [
                            {
                                name: 'caption',
                                type: 'richText',
                                editor: lexicalEditor(),
                            },
                        ],
                    },
                },
            }),
        ],
    }),
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
                const prefix = 'Firehawk Analytics — '
                const fullTitle = `${prefix}${title}`
                return fullTitle.length > 60 ? `${fullTitle.substring(0, 57)}...` : fullTitle
            },
            generateDescription: ({ doc }) => {
                return doc?.description?.value || doc?.description || ''
            },
        }),
    ],
    email: resendAdapter({
        defaultFromAddress: 'onboarding@resend.dev',
        defaultFromName: 'Firehawk Analytics',
        apiKey: process.env.RESEND_API_KEY || '',
    }),
})
