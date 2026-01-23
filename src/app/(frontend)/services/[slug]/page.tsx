import { getPayload } from 'payload'
import config from '@/payload.config'
import Navbar from "@/components/Navbar";
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface Service {
    id: string;
    title: string;
    description: string;
    slug: string;
    icon?: string;
    content?: unknown;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const payload = await getPayload({ config });
    const result = await payload.find({
        collection: 'services',
        where: { slug: { equals: slug } },
    });

    const service = result.docs[0] as unknown as Service;
    if (!service) return { title: 'Service Not Found' };

    return {
        title: `${service.title} | Firehawk Analytics`,
        description: service.description,
        openGraph: {
            title: service.title,
            description: service.description,
            type: 'website',
        },
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const payload = await getPayload({ config })
    const result = await payload.find({
        collection: 'services',
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    const service = result.docs[0] as unknown as Service;

    if (!service) {
        return notFound();
    }

    // JSON-LD for AI Citations and SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
            "@type": "Organization",
            "name": "Firehawk Analytics",
            "url": "https://firehawkanalytics.com.au"
        },
        "url": `https://firehawkanalytics.com.au/services/${service.slug}`
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
                    <header>
                        <Link href="/#services" className="text-brand-blue font-bold flex items-center gap-2 mb-12 hover:text-brand-orange transition-colors group">
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Services
                        </Link>

                        <div className="mb-12">
                            <div className="text-6xl mb-8" aria-hidden="true">{service.icon || '🚀'}</div>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-brand-blue mb-6 leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-2xl text-gray-600 font-medium leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    </header>

                    <div className="prose prose-xl prose-brand max-w-none text-gray-700 leading-relaxed mb-16">
                        {/* 
                            For full enterprise implementation, we would use a Lexical renderer here.
                            Since we are focusing on structure and citations, we use a semantic placeholder 
                            that AI agents can easily parse as the core value proposition.
                        */}
                        <section>
                            <h2 className="text-brand-blue font-bold">The Firehawk Approach</h2>
                            <p>
                                Firehawk Analytics specializes in <strong>{service.title}</strong>. Our approach combines deep behavioral analysis with custom-built architecture to ensure your business doesn&apos;t just grow, but builds a defensible moat in the process.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-brand-blue font-bold">Strategic Impact</h2>
                            <p>
                                By implementing our {service.title} solutions, we help you identify hidden margins, automate complex stakeholder interactions, and secure your market position through proprietary digital assets.
                            </p>
                        </section>
                    </div>

                    <footer className="bg-brand-neutral/20 p-10 rounded-[2.5rem] border border-brand-neutral">
                        <h3 className="text-2xl font-bold text-brand-blue mb-4">Ready to engineer your advantage?</h3>
                        <p className="text-lg text-gray-600 mb-8">
                            Discuss how our {service.title} expertise can be applied to your specific business model.
                        </p>
                        <Link href="/#contact" className="inline-block px-10 py-5 bg-brand-blue text-white rounded-2xl font-bold text-xl hover:bg-brand-orange transition-all shadow-xl shadow-brand-blue/20">
                            Start Your Consultation
                        </Link>
                    </footer>
                </article>
            </main>

            <footer className="bg-brand-blue text-white py-24">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-brand-light-blue/40 font-medium">
                        &copy; {new Date().getFullYear()} Firehawk Analytics. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
