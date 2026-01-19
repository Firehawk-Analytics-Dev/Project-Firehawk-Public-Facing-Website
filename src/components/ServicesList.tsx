import React from 'react'
import Link from 'next/link'

type Service = {
    id: string
    title: string
    description: string
    slug: string
    icon?: string
}

const ServicesList = ({ services }: { services: Service[] }) => {
    if (!services || services.length === 0) {
        return (
            <section id="services" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-brand-blue mb-4">Our Premium Services</h2>
                    <p className="text-gray-500 italic">Elevating analytics to new heights. Coming soon.</p>
                </div>
            </section>
        )
    }

    return (
        <section id="services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-brand-blue mb-4">Master Your Data</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore our suite of data-intelligence solutions designed to ignite growth and clarity.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="group p-8 rounded-3xl bg-brand-neutral/30 border border-brand-neutral hover:border-brand-orange/30 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-orange/5">
                            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">
                                {service.icon || '🚀'}
                            </div>
                            <h3 className="text-2xl font-bold text-brand-blue mb-4 group-hover:text-brand-orange transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {service.description}
                            </p>
                            <Link href={`/services/${service.slug}`} className="text-brand-blue font-bold flex items-center gap-2 group/link">
                                Learn More
                                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServicesList
