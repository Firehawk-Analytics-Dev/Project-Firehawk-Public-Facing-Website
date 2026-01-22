"use client";

import React, { useState } from 'react';

const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate server action / API call
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div id="contact" className="py-24 bg-white text-center">
                <div className="max-w-2xl mx-auto px-4 bg-brand-neutral/20 p-12 rounded-3xl border-2 border-brand-orange/20">
                    <div className="text-6xl mb-6">🚀</div>
                    <h2 className="text-3xl font-bold text-brand-blue mb-4">Request Received!</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Thank you for reaching out. A Firehawk strategist will review your requirements and contact you shortly.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="text-brand-blue font-bold hover:underline"
                    >
                        Send another message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section id="contact" className="py-24 bg-white border-t border-brand-neutral">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-4">Get Started</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-6">Build Your Moat Today.</h3>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Whether you&apos;re looking for exclusive membership to our Insights Portal or need a bespoke application to secure your stakeholder ecosystem, we&apos;re ready to engineer your advantage.
                        </p>

                        <div className="space-y-6">
                            {[
                                "Direct access to strategic BI insights.",
                                "Custom-built architecture for your business logic.",
                                "Fast, scalable, and defensible digital assets."
                            ].map((text, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex-shrink-0 w-6 h-6 bg-brand-light-blue rounded-full flex items-center justify-center text-brand-blue text-xs font-bold">
                                        ✓
                                    </div>
                                    <p className="font-medium text-gray-700">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-brand-neutral/30 p-8 md:p-12 rounded-[2.5rem] border border-brand-neutral shadow-2xl shadow-brand-blue/5">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-brand-blue mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full px-5 py-4 bg-white border border-brand-neutral rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-brand-blue mb-2">Work Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full px-5 py-4 bg-white border border-brand-neutral rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="interest" className="block text-sm font-bold text-brand-blue mb-2">What are you interested in?</label>
                                <select
                                    id="interest"
                                    className="w-full px-5 py-4 bg-white border border-brand-neutral rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                                >
                                    <option>Intelligence as a Service (Membership)</option>
                                    <option>Ecosystem Engineering (Custom App Build)</option>
                                    <option>Legacy Transformation</option>
                                    <option>Other / General Inquiry</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-brand-blue mb-2">Tell us about your project</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                    className="w-full px-5 py-4 bg-white border border-brand-neutral rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                                    placeholder="What challenges can we help you solve?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-5 bg-brand-blue text-white rounded-2xl font-bold text-xl hover:bg-brand-orange transform hover:scale-[1.02] transition-all shadow-xl shadow-brand-blue/20 disabled:bg-gray-400"
                            >
                                {status === 'loading' ? 'Processing...' : 'Secure My Consultation'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
