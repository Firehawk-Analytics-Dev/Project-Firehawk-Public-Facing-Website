import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-neutral/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="Firehawk Analytics Logo"
                                width={180}
                                height={50}
                                className="h-10 w-auto"
                                priority
                            />
                        </Link>
                    </div>
                    <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                        <Link href="#strategy" className="text-brand-blue hover:text-brand-orange px-3 py-2 text-sm font-bold transition-colors">
                            Strategy
                        </Link>
                        <Link href="#moat" className="text-brand-blue hover:text-brand-orange px-3 py-2 text-sm font-bold transition-colors">
                            The Moat
                        </Link>
                        <Link href="#services" className="text-brand-blue hover:text-brand-orange px-3 py-2 text-sm font-bold transition-colors">
                            Services
                        </Link>
                        <Link href="#process" className="text-brand-blue hover:text-brand-orange px-3 py-2 text-sm font-bold transition-colors">
                            Our Process
                        </Link>
                        <Link href="#blog" className="text-brand-blue hover:text-brand-orange px-3 py-2 text-sm font-bold transition-colors">
                            Blog
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="https://members.firehawkanalytics.com.au/login"
                            className="hidden sm:block text-brand-blue font-bold text-sm hover:text-brand-orange transition-colors"
                        >
                            Sign In
                        </Link>
                        <button className="bg-brand-blue text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-orange transition-all duration-300 shadow-lg hover:shadow-brand-orange/20">
                            Build My App
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
