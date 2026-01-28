import { getPayload } from 'payload'
import config from '@/payload.config'
import Navbar from "@/components/Navbar";
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { calculateReadingTime, LexicalContent } from '@/utilities/readingTime';

export const metadata: Metadata = {
    title: 'Strategic Intel Portals | Firehawk Analytics',
    description: 'Deep dives into market dynamics, behavioral analytics, and the engineering of defensible business models.',
};

interface BlogPostSummary {
    id: string;
    title: string;
    slug: string;
    publishedDate: string;
    content?: LexicalContent | null;
    author?: { name?: string | null } | null;
    featuredImage?: { url?: string | null; alt?: string | null } | null;
}

export default async function BlogListingPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page } = await searchParams;
    const currentPage = parseInt(page || '1');
    const limit = 6;

    const payload = await getPayload({ config })
    const result = await payload.find({
        collection: 'blog',
        sort: '-publishedDate',
        depth: 1,
        page: currentPage,
        limit: limit,
    })

    const posts = (result.docs as unknown) as BlogPostSummary[];

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
                            posts.map((post) => {
                                const readTime = calculateReadingTime(post.content);
                                return (
                                    <article key={post.id} className="group flex flex-col h-full bg-white rounded-3xl border border-brand-neutral overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                        <div className="aspect-[16/10] relative overflow-hidden bg-brand-neutral/20">
                                            {post.featuredImage?.url ? (
                                                <Image
                                                    src={post.featuredImage.url}
                                                    alt={post.featuredImage.alt || post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center p-12 bg-gradient-to-br from-brand-blue/5 to-brand-orange/5">
                                                    <div className="text-brand-blue/20 font-black text-4xl text-center select-none uppercase tracking-tighter rotate-[-12deg]">
                                                        Firehawk Strategic Intel
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="absolute top-6 right-6">
                                                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm border border-white/20">
                                                    {readTime} MIN READ
                                                </div>
                                            </div>
                                        </div>
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
                                                    <div className="w-8 h-8 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue text-xs font-bold overflow-hidden">
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
                                );
                            })
                        ) : (
                            <div className="col-span-full py-20 text-center bg-brand-neutral/20 rounded-3xl border-2 border-dashed border-brand-neutral">
                                <p className="text-2xl text-gray-500 font-medium">No intel portals currently indexed.</p>
                                <Link href="/" className="mt-6 inline-block text-brand-blue font-bold hover:underline decoration-brand-orange underline-offset-8">
                                    Return to Command Center
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {result.totalPages > 1 && (
                        <div className="mt-20 flex items-center justify-center gap-4">
                            {result.hasPrevPage && (
                                <Link
                                    href={`/blog?page=${result.prevPage}`}
                                    className="px-8 py-4 bg-white border-2 border-brand-blue text-brand-blue font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all shadow-lg hover:shadow-brand-blue/20"
                                >
                                    ← Previous Intel
                                </Link>
                            )}
                            <div className="flex items-center gap-2 px-6 py-3 bg-brand-neutral/20 rounded-full text-sm font-bold text-brand-blue">
                                <span>PHASE</span>
                                <span className="w-6 h-6 flex items-center justify-center bg-brand-blue text-white rounded-full text-[10px]">
                                    {result.page}
                                </span>
                                <span className="text-gray-400">OF</span>
                                <span>{result.totalPages}</span>
                            </div>
                            {result.hasNextPage && (
                                <Link
                                    href={`/blog?page=${result.nextPage}`}
                                    className="px-8 py-4 bg-brand-blue text-white font-bold rounded-full hover:bg-brand-orange transition-all shadow-lg hover:shadow-brand-orange/20"
                                >
                                    Next Intel →
                                </Link>
                            )}
                        </div>
                    )}
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
