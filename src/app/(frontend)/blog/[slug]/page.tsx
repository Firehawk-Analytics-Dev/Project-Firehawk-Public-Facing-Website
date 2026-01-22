import { getPayload } from 'payload'
import config from '@/payload.config'
import Navbar from "@/components/Navbar";
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const payload = await getPayload({ config })
    const result = await payload.find({
        collection: 'blog',
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    const post = result.docs[0] as unknown as { title: string; description?: string; excerpt?: string; slug: string; createdAt: string };

    if (!post) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 pb-24">
                <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/#blog" className="text-brand-blue font-bold flex items-center gap-2 mb-12 hover:text-brand-orange transition-colors">
                        ← Back to Blog
                    </Link>

                    <header className="mb-12">
                        <div className="text-sm font-bold text-brand-orange uppercase mb-4 tracking-widest">
                            Strategic Insights
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-blue mb-8 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-gray-500 font-medium">
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>Firehawk Strategic Intel</span>
                        </div>
                    </header>

                    <div className="prose prose-xl prose-brand max-w-none text-gray-700 leading-relaxed font-outfit mb-16">
                        {/* Payload rich text rendering component would usually go here */}
                        <p className="text-2xl font-medium text-gray-800 mb-8 italic">
                            {post.excerpt || post.description}
                        </p>
                        <p>
                            In the modern business landscape, defensibility isn&apos;t just about having a better product; it&apos;s about owning the digital infrastructure that connects you to your stakeholders. At Firehawk Analytics, we focus on {post.title} as a core pillar of building a sustainable &quot;Business Moat.&quot;
                        </p>
                    </div>

                    <div className="bg-brand-blue p-10 rounded-[2.5rem] text-white">
                        <h3 className="text-2xl font-bold mb-4">Master Your Market Dynamics</h3>
                        <p className="text-brand-light-blue mb-8 text-lg">
                            Join our exclusive membership to get deeper, real-time insights like these in our Members Portal.
                        </p>
                        <Link href="/#contact" className="inline-block px-8 py-4 bg-brand-orange text-white rounded-xl font-bold text-lg hover:scale-105 transition-all">
                            Inquire About Membership
                        </Link>
                    </div>
                </article>
            </main>

            <footer className="bg-brand-blue text-white py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-brand-light-blue/40 font-medium">
                        &copy; {new Date().getFullYear()} Firehawk Analytics. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
