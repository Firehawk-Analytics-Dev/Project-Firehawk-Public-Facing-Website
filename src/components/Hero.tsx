import React from 'react'

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-brand-neutral/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-brand-blue uppercase bg-brand-light-blue/30 rounded-full animate-fade-in">
                        Data-Driven Intelligence
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-brand-blue leading-tight mb-8">
                        Ignite Your Business With <span className="bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">Firehawk Analytics</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
                        Harness the power of premium data insights. We provide the vision and agility you need to dominate your market through advanced behavioral and predictive analysis.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-lg hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/20">
                            Explore Our Solutions
                        </button>
                        <button className="px-8 py-4 bg-white text-brand-blue border-2 border-brand-blue rounded-xl font-bold text-lg hover:bg-brand-neutral/30 transition-all">
                            Schedule a Demo
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative gradient blobs */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-light-blue/20 rounded-full blur-3xl -z-10" />
        </section>
    )
}

export default Hero
