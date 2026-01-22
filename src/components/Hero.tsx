import React from 'react'
import Link from 'next/link'

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-brand-neutral/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-brand-blue uppercase bg-brand-light-blue/30 rounded-full">
                        Data-Driven Intelligence
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-brand-blue leading-tight mb-8 tracking-tight">
                        Build Your <span className="text-brand-orange">Advantage.</span><br />
                        Protect Your <span className="bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">Growth.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-medium">
                        Firehawk Analytics provides the insights to lead your market and the custom architecture to secure it.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="https://members.firehawkanalytics.com.au/login"
                            className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-lg hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2 group"
                        >
                            Access Members Portal
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                        <Link
                            href="#contact"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-brand-blue border-2 border-brand-blue rounded-xl font-bold text-lg hover:bg-brand-neutral/30 transition-all flex items-center justify-center"
                        >
                            Build Your Custom App
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative gradient blobs */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-light-blue/20 rounded-full blur-3xl -z-10" />
        </section>
    )
}

export default Hero
