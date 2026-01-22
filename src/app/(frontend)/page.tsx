import { getPayload } from 'payload'
import config from '@/payload.config'
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesList from "@/components/ServicesList";
import ContactForm from "@/components/ContactForm";
import Link from 'next/link';
import { BarChart3, Building2, Eye, Ruler, Rocket, ShieldCheck, Users, Network, Lock, Zap } from 'lucide-react';

export default async function Home() {
  let services: { id: string; title: string; description: string; slug: string; icon?: string }[] = [];
  let error: { message?: string } | null = null;

  console.log("HOME PAGE: Initializing Payload...");
  try {
    const payload = await getPayload({ config })
    console.log("HOME PAGE: Payload initialized. Finding services...");
    const result = await payload.find({
      collection: 'services',
      limit: 10,
    })
    console.log("HOME PAGE: Services found:", result.docs.length);
    services = result.docs as unknown as { id: string; title: string; description: string; slug: string; icon?: string }[];
  } catch (err: unknown) {
    console.error("HOME PAGE ERROR:", err);
    error = err as { message?: string };
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-8">
        <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-2xl border border-red-200">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h1>
          <p className="text-gray-700 mb-4">The website is currently unable to connect to the database.</p>
          <div className="bg-gray-100 p-4 rounded font-mono text-sm text-red-500 overflow-auto max-h-60">
            {error.message || JSON.stringify(error)}
          </div>
          <p className="mt-4 text-sm text-gray-500">Checking: DATABASE_URI, NEXT_PUBLIC_SUPABASE_URL</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />

        {/* Dual-Core Strategy */}
        <section id="strategy" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-4">The Dual-Core Strategy</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-6">Data to See the Path. <br />Architecture to Own the Road.</h3>
              <p className="max-w-3xl mx-auto text-xl text-gray-600">
                Sustainable growth requires two things: total visibility and a defensible infrastructure.
                At Firehawk, we deliver both through our established insights platform and our custom application studio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-brand-neutral/20 p-10 rounded-3xl border border-brand-neutral hover:border-brand-blue/30 transition-all">
                <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center text-white mb-8">
                  <BarChart3 size={32} strokeWidth={2.5} />
                </div>
                <h4 className="text-2xl font-bold text-brand-blue mb-4">1. The Insights Engine (Members Portal)</h4>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our flagship BI platform remains the heartbeat of our partnership. We provide members with high-level, real-time insights that allow for fast, profitable decision-making.
                </p>
                <ul className="space-y-4">
                  {[
                    "Operational Transparency: See exactly where your margins are.",
                    "Market Intelligence: Stay ahead of shifts before they impact your P&L.",
                    "Strategic Clarity: Turn complex data into a simple roadmap for growth."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 font-medium">
                      <span className="text-brand-orange mt-1">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-neutral/20 p-10 rounded-3xl border border-brand-neutral hover:border-brand-orange/30 transition-all">
                <div className="w-14 h-14 bg-brand-orange rounded-2xl flex items-center justify-center text-white mb-8">
                  <Building2 size={32} strokeWidth={2.5} />
                </div>
                <h4 className="text-2xl font-bold text-brand-blue mb-4">2. The Infrastructure Studio (Custom Web Apps)</h4>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Beyond understanding your data, we build the digital ecosystem that secures your business. We design and deploy bespoke web applications that connect you directly to your customers and suppliers.
                </p>
                <ul className="space-y-4">
                  {[
                    "Create Your 'Moat': Build proprietary tools that make your business indispensable.",
                    "Seamless Integration: Link your suppliers and customers into a single, unified workflow.",
                    "Sustainable Scaling: Custom architecture that automates growth."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 font-medium">
                      <span className="text-brand-blue mt-1">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Business Moat Framework */}
        <section id="moat" className="py-24 bg-brand-blue text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] -z-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-brand-light-blue uppercase mb-4">The &quot;Business Moat&quot; Framework</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-6">Why Build Custom Architecture?</h3>
              <p className="max-w-2xl mx-auto text-xl text-brand-light-blue font-medium">
                In a world of generic software, a custom-built ecosystem is your greatest defense.
                We build applications that create &quot;sticky&quot; relationships with your stakeholders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Customer Portals",
                  impact: "Increases switching costs by providing a seamless, branded experience they can't get elsewhere.",
                  icon: <Users className="text-brand-orange" size={32} />
                },
                {
                  title: "Supplier Integrations",
                  impact: "Streamlines the supply chain, reducing friction and securing preferential operational flow.",
                  icon: <Network className="text-brand-orange" size={32} />
                },
                {
                  title: "Proprietary Logic",
                  impact: "Encapsulates your unique 'secret sauce' into software that competitors cannot replicate.",
                  icon: <Lock className="text-brand-orange" size={32} />
                },
                {
                  title: "Unified Data Flow",
                  impact: "Connects your Members Portal insights directly to your execution tools for a closed-loop system.",
                  icon: <Zap className="text-brand-orange" size={32} />
                }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/15 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/10 rounded-2xl">
                      {item.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-white">{item.title}</h4>
                  </div>
                  <p className="text-brand-light-blue text-lg leading-relaxed font-medium">
                    {item.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Updated Service Pillars / List */}
        <ServicesList services={services as { id: string; title: string; description: string; slug: string; icon?: string }[]} />

        {/* The Firehawk Process */}
        <section id="process" className="py-24 bg-brand-neutral/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <h2 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-4">The Firehawk Process</h2>
              <h3 className="text-4xl font-extrabold text-brand-blue mb-6">&quot;We don&apos;t just build software; we build defensible business models.&quot;</h3>
              <p className="text-xl text-gray-600 italic">
                We identify where your business is vulnerable and engineer the digital architecture to protect and scale it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Insight", icon: <Eye size={36} className="text-brand-blue" />, text: "Identify growth opportunities through our Members Portal." },
                { step: "02", title: "Design", icon: <Ruler size={36} className="text-brand-blue" />, text: "Architect a custom application to capture that opportunity." },
                { step: "03", title: "Deployment", icon: <Rocket size={36} className="text-brand-blue" />, text: "Build and integrate the tool into your stakeholder ecosystem." },
                { step: "04", title: "Defense", icon: <ShieldCheck size={36} className="text-brand-blue" />, text: "Continuously optimize the system to deepen your competitive moat." }
              ].map((item, i) => (
                <div key={i} className="relative group p-8 bg-white rounded-3xl border border-brand-neutral hover:shadow-xl transition-all">
                  <div className="mb-6">{item.icon}</div>
                  <div className="text-sm font-black text-brand-blue/10 absolute top-8 right-8 text-5xl group-hover:text-brand-orange/20 transition-colors">{item.step}</div>
                  <h4 className="text-xl font-bold text-brand-blue mb-4">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-white border-t border-brand-neutral">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-8">Secure your market position.</h2>
            <p className="text-xl text-gray-600 mb-12">
              Whether you need the clarity of our Insights Portal or the strength of a custom-built application, Firehawk is your partner in sustainable, profitable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="#contact" className="px-10 py-5 bg-brand-orange text-white rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl shadow-brand-orange/20">
                Inquire About Membership
              </Link>
              <Link href="#contact" className="px-10 py-5 bg-brand-blue text-white rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl shadow-brand-blue/20">
                Start Your App Build
              </Link>
            </div>
          </div>
        </section>

        <ContactForm />

        {/* Blog Section */}
        <section id="blog" className="py-24 bg-brand-neutral/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-4">Strategic Intel</h2>
              <h3 className="text-4xl font-extrabold text-brand-blue mb-6">Latest From the Laboratory</h3>
              <p className="max-w-2xl mx-auto text-xl text-gray-600">
                Deep dives into market dynamics, behavioral analytics, and the engineering of defensible business models.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* This would ideally fetch from the 'blog' collection */}
              {[
                {
                  title: "Defensibility in the Age of AI: Why Custom Architecture is Non-Negotiable",
                  excerpt: "As algorithm commoditization accelerates, the only real protection is the proprietary data flow you own.",
                  date: "Jan 15, 2026",
                  slug: "defensibility-ai-architecture"
                },
                {
                  title: "Hidden Margins: Finding Revenue in the Friction of Legacy Systems",
                  excerpt: "How we identified a 14% margin increase for a logistics partner through simple stakeholder automation.",
                  date: "Jan 10, 2026",
                  slug: "hidden-margins-legacy-transformation"
                },
                {
                  title: "The Zero-Data Principle: Securing Your Enterprise Value",
                  excerpt: "Why the data you don't collect is just as important as the data you do when building for the long term.",
                  date: "Jan 05, 2026",
                  slug: "zero-data-principle"
                }
              ].map((post, i) => (
                <div key={i} className="group flex flex-col h-full bg-white rounded-3xl border border-brand-neutral overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1">
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="text-brand-orange font-bold text-sm mb-4">{post.date}</div>
                    <h4 className="text-2xl font-bold text-brand-blue mb-4 group-hover:text-brand-orange transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="text-brand-blue font-bold flex items-center gap-2 group/link">
                      Read Analysis
                      <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="/blog" className="text-brand-blue font-bold text-lg hover:underline decoration-brand-orange decoration-2 underline-offset-8">
                View All Intel Portals
              </Link>
            </div>
          </div>
        </section>
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
