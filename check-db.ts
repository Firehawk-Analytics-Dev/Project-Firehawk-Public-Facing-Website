import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config'

async function checkDatabase() {
    const payload = await getPayload({ config })

    const blogs = await payload.find({ collection: 'blog' })
    const blogDrafts = await payload.find({ collection: 'blog-drafts' })
    const newsletters = await payload.find({ collection: 'newsletters' })
    const socials = await payload.find({ collection: 'social-media' })
    const users = await payload.find({ collection: 'users' })

    console.log('--- Database Status ---')
    console.log(`Blogs: ${blogs.totalDocs}`)
    console.log(`Blog Drafts: ${blogDrafts.totalDocs}`)
    console.log(`Newsletters: ${newsletters.totalDocs}`)
    console.log(`Social Media Posts: ${socials.totalDocs}`)
    console.log(`Users: ${users.totalDocs}`)

    if (users.totalDocs > 0) {
        console.log('Users found:', users.docs.map(u => ({ id: u.id, email: u.email })))
    }

    process.exit(0)
}

checkDatabase().catch(err => {
    console.error(err)
    process.exit(1)
})
