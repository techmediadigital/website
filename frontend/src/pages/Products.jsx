import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

/* ─── Product Data ──────────────────────────────────────────────────────── */
const products = [
    {
        id: 'erp',
        title: 'Enterprise Resource Planning (ERP)',
        tagline: 'Unify your business operations under one intelligent system.',
        description: 'Our custom-built ERP system centralizes your data, streamlines workflows, and gives you real-time visibility into every department — from finance and HR to supply chain and inventory management. Eliminate data silos and make faster, more informed decisions.',
        features: [
            'Centralized Data Architecture',
            'Real-time Financial Dashboards',
            'Automated Inventory & Supply Chain',
            'Scalable & Custom-tailored modules'
        ],
        image: '/product_erp.png',
        accentColor: '#2AB6FB',
        layout: 'left'
    },
    {
        id: 'crm',
        title: 'Customer Relationship Management (CRM)',
        tagline: 'Turn leads into loyal customers with intelligent pipeline management.',
        description: 'A powerful, intuitive CRM designed to help your sales teams close deals faster. Track interactions, automate follow-ups, and get a 360-degree view of your customer journey from first contact to post-sale support.',
        features: [
            'Visual Sales Pipeline',
            'Automated Lead Nurturing',
            'Customer Insight & Analytics',
            'Seamless Multi-channel Communication'
        ],
        image: '/product_crm.png',
        accentColor: '#A855F7',
        layout: 'right'
    },
    {
        id: 'ai-chatbot',
        title: 'AI Customer Support Chatbot',
        tagline: '24/7 intelligent assistance that sounds incredibly human.',
        description: 'Deploy our advanced AI chatbot on your website or WhatsApp to handle customer queries instantly. Trained on your proprietary data, it resolves issues, qualifies leads, and hands off complex interactions to human agents seamlessly.',
        features: [
            'Natural Language Processing (NLP)',
            'Custom Contextual Training',
            'WhatsApp & Web Integration',
            '24/7 Uninterrupted Service'
        ],
        image: '/product_ai_chatbot.png',
        accentColor: '#00f2ea',
        layout: 'left'
    }
];

/* ─── Page ──────────────────────────────────────────────────────────────── */
const Products = () => {
    return (
        <div style={{ background: '#050505', minHeight: '100vh', paddingTop: '80px', overflowX: 'hidden' }}>
            <style>{`
                @keyframes fade-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .prod-animate { animation: fade-up 0.8s ease both; }
                .prod-delay-1 { animation-delay: 0.15s; }
                .prod-delay-2 { animation-delay: 0.3s; }
                
                @media (max-width: 900px) {
                    .prod-row { flexDirection: column !important; }
                    .prod-text { padding: 2rem !important; }
                    .prod-img-container { minHeight: 300px !important; }
                }
            `}</style>

            {/* ── Hero ──────────────────────────────────────────────────── */}
            <section style={{
                position: 'relative', padding: '6rem 2rem 4rem', textAlign: 'center',
                background: 'radial-gradient(ellipse at 50% 0%, #0a1628 0%, #050505 70%)',
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div className="prod-animate" style={{ display: 'inline-block', background: 'rgba(42,182,251,0.1)', border: '1px solid rgba(42,182,251,0.25)', color: '#2AB6FB', padding: '0.4rem 1.2rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                        Software Solutions
                    </div>
                    <h1 className="prod-animate prod-delay-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', lineHeight: 1.1, color: '#fff', marginBottom: '1.5rem' }}>
                        Our Flagship <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.7)', backgroundImage: 'linear-gradient(135deg, #2AB6FB, #A855F7)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Products.</span>
                    </h1>
                    <p className="prod-animate prod-delay-2" style={{ color: '#94a3b8', fontSize: '1.15rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
                        Powerful, scalable, and beautifully designed software platforms engineered to accelerate your business growth.
                    </p>
                </div>
            </section>

            {/* ── Product List ──────────────────────────────────────────── */}
            <section style={{ padding: '4rem 2rem 6rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '6rem' }}>
                {products.map((p, index) => (
                    <div key={p.id} className="prod-row prod-animate" style={{
                        animationDelay: `${0.2 * index}s`,
                        display: 'flex',
                        flexDirection: p.layout === 'left' ? 'row' : 'row-reverse',
                        alignItems: 'center',
                        gap: '4rem',
                        background: 'rgba(255,255,255,0.015)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '2rem',
                        overflow: 'hidden'
                    }}>
                        {/* Image Side */}
                        <div className="prod-img-container" style={{ flex: '1.2', position: 'relative', minHeight: '450px', width: '100%', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${p.accentColor}22 0%, transparent 100%)`, zIndex: 1, pointerEvents: 'none' }} />
                            <img src={p.image} alt={p.title} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                        </div>

                        {/* Text Side */}
                        <div className="prod-text" style={{ flex: '1', padding: p.layout === 'left' ? '4rem 4rem 4rem 0' : '4rem 0 4rem 4rem' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', marginBottom: '0.8rem', lineHeight: 1.2 }}>{p.title}</h2>
                            <p style={{ color: p.accentColor, fontSize: '1.05rem', fontWeight: '600', marginBottom: '1.5rem' }}>{p.tagline}</p>
                            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>{p.description}</p>

                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {p.features.map(f => (
                                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#cbd5e1', fontSize: '0.95rem' }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={p.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.8rem 1.8rem',
                                background: `linear-gradient(135deg, ${p.accentColor}dd, ${p.accentColor}aa)`,
                                color: '#fff', fontWeight: '700', borderRadius: '0.5rem',
                                textDecoration: 'none', transition: 'opacity 0.2s',
                                boxShadow: `0 8px 25px -5px ${p.accentColor}66`
                            }}>
                                Request a Demo →
                            </Link>
                        </div>
                    </div>
                ))}
            </section>

            <Footer />
        </div>
    );
};

export default Products;
