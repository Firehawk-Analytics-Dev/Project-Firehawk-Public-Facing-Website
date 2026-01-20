import { getPayload } from 'payload'
import config from '@/payload.config'
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesList from "@/components/ServicesList";

export default async function Home() {
  let services: unknown[] = [];
  let error: { message?: string } | null = null;

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'services',
      limit: 10,
    })
    services = result.docs;
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
        <ServicesList services={services as { id: string; title: string; description: string; slug: string; icon?: string }[]} />
      </main>
      <footer className="bg-brand-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-brand-light-blue/60">
            &copy; {new Date().getFullYear()} Firehawk Analytics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
