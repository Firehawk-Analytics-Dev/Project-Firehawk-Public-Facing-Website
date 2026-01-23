import { getPayload } from 'payload'
import config from '@/payload.config'
import Navbar from "@/components/Navbar";
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Strategic Intel Portals | Firehawk Analytics',
    description: 'Deep dives into market dynamics, behavioral analytics, and the engineering of defensible business models.',
};

export default async function BlogListingPage() {
    const payload = await getPayload({ config })
    const result = await payload.find({
        collection: 'blog',
        sort: '-publishedDate',
        depth: 1,
    })

    const posts = result.docs as unknown as {
        id: string;
        title: string;
        slug: string;
        publishedDate: string;
        author?: { name?: string };
        featuredImage?: { url?: string; alt?: string }
    }[];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-AU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    // JSON-LD for Collection Page
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Firehawk Strategic Intel",
        "description": "Enterprise-grade strategic intelligence and behavioral analytics research.",
        "publisher": {
            "@type": "Organization",
            "name": "Firehawk Analytics"
        }
    };

    return (
        <div className="min-h-screen bg-white text-brand-blue">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="mb-20">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">Strategic Intel Portals</h1>
                        <p className="text-2xl text-gray-600 max-w-3xl font-medium leading-relaxed">
                            Deep dives into market dynamics, behavioral analytics, and the engineering of defensible business models.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <article key={post.id} className="group flex flex-col h-full bg-white rounded-3xl border border-brand-neutral overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
                                    {post.featuredImage?.url && (
                                        <div className="aspect-[16/10] relative overflow-hidden">
                                            <img
                                                src={post.featuredImage.url}
                                                alt={post.featuredImage.alt || post.title}
                                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    )}
                                    <div className="p-10 flex flex-col flex-grow">
                                        <div className="flex items-center gap-3 mb-6">
                                            <time className="text-brand-orange font-bold text-sm tracking-widest uppercase" dateTime={post.publishedDate}>
                                                {formatDate(post.publishedDate)}
                                            </time>
                                            <span className="w-1 h-1 bg-brand-neutral rounded-full" />
                                            <span className="text-gray-400 text-xs font-bold uppercase tracking-tight">Research</span>
                                        </div>

                                        <h2 className="text-3xl font-bold mb-6 group-hover:text-brand-orange transition-colors leading-tight line-clamp-2">
                                            {post.title}
                                        </h2>

                                        <div className="mt-auto pt-8 border-t border-brand-neutral/50 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue text-xs font-bold">
                                                    {post.author?.name?.charAt(0) || 'F'}
                                                </div>
                                                <span className="text-sm font-bold text-gray-500">{post.author?.name || 'Firehawk Team'}</span>
                                            </div>
                                            <Link href={`/blog/${post.slug}`} className="text-brand-blue font-black flex items-center gap-2 group/link">
                                                Explore
                                                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-brand-neutral/20 rounded-3xl border-2 border-dashed border-brand-neutral">
                                <p className="text-2xl text-gray-500 font-medium">No intel portals currently indexed.</p>
                                <Link href="/" className="mt-6 inline-block text-brand-blue font-bold hover:underline decoration-brand-orange underline-offset-8">
                                    Return to Command Center
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="bg-brand-blue text-white py-24">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-brand-light-blue/40 font-medium font-bold uppercase tracking-[0.2em] text-sm">
                        &copy; {new Date().getFullYear()} Firehawk Analytics — Build Your Moat.
                    </p>
                </div>
            </footer>
        </div>
    );
}
