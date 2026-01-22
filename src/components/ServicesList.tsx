import React from 'react'
import Link from 'next/link'
import DynamicIcon from './DynamicIcon'

type Service = {
    id: string
    title: string
    description: string
    slug: string
    icon?: string
}

const ServicesList = ({ services }: { services: Service[] }) => {
    // If no services from CMS, show the strategic pillars as defaults
    const displayServices = services && services.length > 0 ? services : [
        {
            id: '1',
            title: 'Intelligence as a Service',
            description: 'Exclusive access to the Firehawk Members Portal for ongoing strategic BI and data-driven guidance.',
            slug: 'intelligence-as-a-service',
            icon: 'Diamond'
        },
        {
            id: '2',
            title: 'Ecosystem Engineering',
            description: 'Building the web apps that sit between you and your market—connecting stakeholders and automating complex transactions.',
            slug: 'ecosystem-engineering',
            icon: 'Settings'
        },
        {
            id: '3',
            title: 'Legacy Transformation',
            description: 'Turning outdated, fragmented processes into modern, high-performance digital assets that increase enterprise value.',
            slug: 'legacy-transformation',
            icon: 'Zap'
        }
    ];

    return (
        <section id="services" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-4">How We Partner With You</h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-6">Service Pillars</h3>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                        Explore our suite of data-intelligence solutions designed to ignite growth and clarity.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayServices.map((service) => (
                        <div key={service.id} className="group p-10 rounded-[2rem] bg-brand-neutral/20 border-2 border-transparent hover:border-brand-orange/20 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-brand-orange/10">
                            <div className="mb-8 group-hover:scale-110 transition-transform duration-500 inline-block text-brand-blue group-hover:text-brand-orange">
                                <DynamicIcon name={service.icon || 'Rocket'} size={48} strokeWidth={2} />
                            </div>
                            <h4 className="text-2xl font-bold text-brand-blue mb-4 group-hover:text-brand-orange transition-colors">
                                {service.title}
                            </h4>
                            <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                                {service.description}
                            </p>
                            <Link href={`/services/${service.slug}`} className="text-brand-blue font-bold flex items-center gap-2 group/link text-lg">
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
