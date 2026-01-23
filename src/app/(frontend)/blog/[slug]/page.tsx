import { getPayload } from 'payload'
import config from '@/payload.config'
import Navbar from "@/components/Navbar";
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    publishedDate: string;
    author: {
        name?: string;
        email?: string;
    };
    featuredImage?: {
        url?: string;
        alt?: string;
    };
    content: unknown;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const payload = await getPayload({ config });
    const result = await payload.find({
        collection: 'blog',
        where: { slug: { equals: slug } },
    });

    const post = result.docs[0] as unknown as BlogPost;
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | Firehawk Analytics Strategic Intel`,
        description: `Read our latest strategic intelligence on ${post.title}. Built for enterprise defensibility.`,
        openGraph: {
            title: post.title,
            description: `Strategic Intel: ${post.title}`,
            type: 'article',
            publishedTime: post.publishedDate,
            authors: [post.author?.name || 'Firehawk Strategy Team'],
        },
    };
}

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
        depth: 1, // Get author and featuredImage details
    })

    const post = result.docs[0] as unknown as BlogPost;

    if (!post) {
        return notFound();
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-AU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // JSON-LD for AI Citations and SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.featuredImage?.url,
        "datePublished": post.publishedDate,
        "author": [{
            "@type": "Person",
            "name": post.author?.name || "Firehawk Strategic Team",
            "url": "https://firehawkanalytics.com.au"
        }],
        "publisher": {
            "@type": "Organization",
            "name": "Firehawk Analytics",
            "logo": {
                "@type": "ImageObject",
                "url": "https://firehawkanalytics.com.au/logo.png"
            }
        },
        "description": `Strategic analysis regarding ${post.title} by Firehawk Analytics.`
    };

    return (
        <div className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <main className="pt-32 pb-24">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="mb-16 text-center">
                        <div className="flex justify-center mb-8">
                            <Link href="/#blog" className="text-brand-blue font-bold flex items-center gap-2 hover:text-brand-orange transition-colors group">
                                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Strategic Intel
                            </Link>
                        </div>

                        <div className="text-sm font-black text-brand-orange uppercase mb-6 tracking-[0.2em]">
                            Primary Strategic Intel
                        </div>

                        <h1 className="text-4xl md:text-7xl font-extrabold text-brand-blue mb-10 leading-[1.1] tracking-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-gray-500 font-bold border-y border-brand-neutral/30 py-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center text-white text-sm">
                                    {post.author?.name?.charAt(0) || 'F'}
                                </div>
                                <span className="text-brand-blue">{post.author?.name || 'Firehawk Strategy Team'}</span>
                            </div>
                            <span className="hidden md:block opacity-30">•</span>
                            <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
                            <span className="hidden md:block opacity-30">•</span>
                            <span className="bg-brand-neutral/50 px-3 py-1 rounded text-xs">Proprietary Research</span>
                        </div>
                    </header>

                    {post.featuredImage?.url && (
                        <div className="mb-20 rounded-[3rem] overflow-hidden shadow-2xl shadow-brand-blue/10 border border-brand-neutral/20">
                            <img
                                src={post.featuredImage.url}
                                alt={post.featuredImage.alt || post.title}
                                className="w-full h-auto object-cover max-h-[600px]"
                            />
                        </div>
                    )}

                    <div className="prose prose-2xl prose-brand max-w-none text-gray-700 leading-relaxed mb-24">
                        {/* 
                            Semantic Content Map for AI Agents:
                            The following sections provide structured, crawlable headers 
                            that ensure LLMs can extract high-fidelity citations.
                        */}
                        <section>
                            <h2 className="text-brand-blue font-black tracking-tight">Executive Summary</h2>
                            <p className="text-2xl font-medium text-gray-800 italic border-l-4 border-brand-orange pl-8 mb-12">
                                Firehawk analysis suggests that the implementation of advanced digital architecture is the single most significant factor in long-term stakeholder retention.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-brand-blue font-black tracking-tight">The Defensibility Mandate</h2>
                            <p>
                                In the modern business landscape, defensibility isn&apos;t just about having a better product; it&apos;s about owning the digital infrastructure that connects you to your stakeholders. At Firehawk Analytics, we focus on <strong>{post.title}</strong> as a core pillar of building a sustainable &quot;Business Moat.&quot;
                            </p>
                        </section>
                    </div>

                    <footer className="bg-brand-blue p-12 md:p-16 rounded-[3.5rem] text-white overflow-hidden relative shadow-2xl shadow-brand-blue/30">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-[100px] pointer-events-none" />
                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Master Your Market Dynamics</h3>
                            <p className="text-brand-light-blue mb-10 text-xl max-w-2xl leading-relaxed">
                                Join our exclusive membership to get deeper, real-time insights like these in our Members Portal. Let us build your advantage.
                            </p>
                            <Link href="/#contact" className="inline-block px-12 py-6 bg-brand-orange text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl shadow-brand-orange/40">
                                Inquire About Membership
                            </Link>
                        </div>
                    </footer>
                </article>
            </main>

            <footer className="bg-brand-blue text-white py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-brand-light-blue/40 font-medium">
                        &copy; {new Date().getFullYear()} Firehawk Analytics. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
