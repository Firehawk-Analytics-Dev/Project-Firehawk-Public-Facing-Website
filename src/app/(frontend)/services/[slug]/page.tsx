import { getPayload } from 'payload'
import config from '@/payload.config'
import Navbar from "@/components/Navbar";
import { notFound } from 'next/navigation';
import Link from 'next/link';

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

    const service = result.docs[0] as unknown as { title: string; description: string; slug: string; icon?: string };

    if (!service) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/#services" className="text-brand-blue font-bold flex items-center gap-2 mb-12 hover:text-brand-orange transition-colors">
                        ← Back to Services
                    </Link>

                    <div className="mb-12">
                        <div className="text-6xl mb-8">{service.icon || '🚀'}</div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-blue mb-6 leading-tight">
                            {service.title}
                        </h1>
                        <p className="text-2xl text-gray-600 font-medium leading-relaxed">
                            {service.description}
                        </p>
                    </div>

                    <div className="prose prose-xl prose-brand max-w-none text-gray-700 leading-relaxed mb-16">
                        {/* Rich text content would go here */}
                        <p>
                            Firehawk Analytics specializes in {service.title}. Our approach combines deep behavioral analysis with custom-built architecture to ensure your business doesn&apos;t just grow, but builds a defensible moat in the process.
                        </p>
                        <h2 className="text-brand-blue font-bold">Strategic Impact</h2>
                        <p>
                            By implementing our {service.title} solutions, we help you identify hidden margins, automate complex stakeholder interactions, and secure your market position through proprietary digital assets.
                        </p>
                    </div>

                    <div className="bg-brand-neutral/20 p-10 rounded-[2.5rem] border border-brand-neutral">
                        <h3 className="text-2xl font-bold text-brand-blue mb-4">Ready to engineer your advantage?</h3>
                        <p className="text-lg text-gray-600 mb-8">
                            Discuss how our {service.title} expertise can be applied to your specific business model.
                        </p>
                        <Link href="/#contact" className="inline-block px-10 py-5 bg-brand-blue text-white rounded-2xl font-bold text-xl hover:bg-brand-orange transition-all shadow-xl shadow-brand-blue/20">
                            Start Your Consultation
                        </Link>
                    </div>
                </div>
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
