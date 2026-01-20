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
                    <div className="hidden md:ml-6 md:flex md:space-x-8">
                        <Link href="#services" className="text-brand-blue hover:text-brand-orange px-3 py-2 text-sm font-medium transition-colors">
                            Services
                        </Link>
                        <Link href="#about" className="text-brand-blue hover:text-brand-orange px-3 py-2 text-sm font-medium transition-colors">
                            About
                        </Link>
                        <Link href="#blog" className="text-brand-blue hover:text-brand-orange px-3 py-2 text-sm font-medium transition-colors">
                            Blog
                        </Link>
                        <Link href="#contact" className="text-brand-blue hover:text-brand-orange px-3 py-2 text-sm font-medium transition-colors">
                            Contact
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <button className="bg-brand-blue text-white px-6 py-2.5 rounded-full font-semibold hover:bg-brand-orange transition-all duration-300 shadow-lg hover:shadow-brand-orange/20">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
