import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

/* ─── Client Data ─────────────────────────────────────────────────────── */
const clients = [
    {
        id: 'newnuva',
        name: 'New Nuva',
        tagline: 'Multi-division brand — Waterlab, FoodTech & AdBlue',
        url: 'https://newnuva.com/',
        accentColor: '#2AB6FB',
        featured: true,
        services: ['Digital Marketing', 'Meta Ads', 'Poster Design', 'Social Media Handling', 'Video Production'],
        cover: '/portfolio_digital_marketing.webp',
        description:
            "Full-spectrum digital marketing for New Nuva's three divisions — from Meta ad campaigns and targeted social content to creative poster series and on- location ad video production.",
        stats: [
            { value: '15+', label: 'Creatives' },
            { value: '3', label: 'Divisions' },
            { value: '5', label: 'Services' },
        ],
    },
    // ── Add more clients below following the same structure ──────────────
];

/* ─── All service tags (for the filter bar) ────────────────────────────── */
const ALL_SERVICES = [
    'Digital Marketing',
    'Meta Ads',
    'Poster Design',
    'Social Media Handling',
    'Video Production',
    'Web Development',
    'SEO',
];

const TAG_COLORS = {
    'Digital Marketing': { bg: 'rgba(42,182,251,0.12)', border: 'rgba(42,182,251,0.3)', text: '#2AB6FB' },
    'Meta Ads': { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.3)', text: '#A855F7' },
    'Poster Design': { bg: 'rgba(253,203,82,0.12)', border: 'rgba(253,203,82,0.3)', text: '#FDCB52' },
    'Social Media Handling': { bg: 'rgba(0,242,234,0.12)', border: 'rgba(0,242,234,0.3)', text: '#00f2ea' },
    'Video Production': { bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.3)', text: '#EC4899' },
    'Web Development': { bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.3)', text: '#F97316' },
    'SEO': { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)', text: '#22C55E' },
};

/* ─── Service Tag component ─────────────────────────────────────────────── */
const Tag = ({ label, small }) => {
    const c = TAG_COLORS[label] || { bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.15)', text: '#fff' };
    return (
        <span style={{
            background: c.bg, border: `1px solid ${c.border}`, color: c.text,
            padding: small ? '0.2rem 0.55rem' : '0.3rem 0.75rem',
            borderRadius: '6px', fontSize: small ? '0.68rem' : '0.75rem', fontWeight: '600',
            whiteSpace: 'nowrap',
        }}>{label}</span>
    );
};

/* ─── Client Card ───────────────────────────────────────────────────────── */
const ClientCard = ({ client }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${hovered ? client.accentColor + '55' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '1.25rem', overflow: 'hidden',
                transition: 'all 0.3s ease',
                transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: hovered ? `0 16px 48px ${client.accentColor}18` : 'none',
                display: 'flex', flexDirection: 'column',
            }}
        >
            {/* Cover */}
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden', flexShrink: 0 }}>
                <img
                    src={client.cover} alt={client.name} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.3) 55%, transparent 100%)' }} />
                {/* Client name on image */}
                <div style={{ position: 'absolute', bottom: '1rem', left: '1.2rem', right: '1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: client.accentColor, boxShadow: `0 0 8px ${client.accentColor}`, flexShrink: 0 }} />
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff', margin: 0 }}>{client.name}</h3>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0.2rem 0 0 1.35rem' }}>{client.tagline}</p>
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: '1.3rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.7', margin: 0 }}>{client.description}</p>

                {/* Service tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {client.services.map(s => <Tag key={s} label={s} small />)}
                </div>

                {/* Stats */}
                {client.stats && (
                    <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        {client.stats.map(st => (
                            <div key={st.label} style={{ textAlign: 'center', flex: 1 }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: client.accentColor, lineHeight: 1 }}>{st.value}</div>
                                <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.2rem' }}>{st.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Visit link */}
                {client.url && (
                    <a href={client.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: '600', color: client.accentColor, textDecoration: 'none' }}>
                        Visit {client.name} ↗
                    </a>
                )}
            </div>
        </div>
    );
};

/* ─── "Add Soon" placeholder card ──────────────────────────────────────── */
const ComingSoonCard = () => (
    <div style={{
        background: 'rgba(255,255,255,0.015)',
        border: '1px dashed rgba(255,255,255,0.1)',
        borderRadius: '1.25rem', minHeight: '340px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
        color: '#3f4f60',
    }}>
        <div style={{ fontSize: '2rem' }}>+</div>
        <div style={{ fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase' }}>More Clients Coming</div>
    </div>
);

/* ─── Page ──────────────────────────────────────────────────────────────── */
const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', ...ALL_SERVICES];

    const filtered = activeFilter === 'All'
        ? clients
        : clients.filter(c => c.services.includes(activeFilter));

    return (
        <div style={{ background: '#050505', minHeight: '100vh', paddingTop: '80px' }}>
            <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes orb-drift {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(40px,-30px) scale(1.1); }
        }
        .pflio-hero-h { animation: fade-up 0.75s ease both; }
        .pflio-hero-p { animation: fade-up 0.75s 0.12s ease both; }
        .pflio-pills  { animation: fade-up 0.75s 0.22s ease both; }
        .pflio-pill { cursor: pointer; transition: all 0.2s ease; border: none; font-family: inherit; }
        .pflio-pill:hover { opacity: 1 !important; }
        @media (max-width: 768px) {
          .pflio-grid { grid-template-columns: 1fr !important; }
          .pflio-filter-bar { flex-wrap: wrap !important; }
        }
      `}</style>

            {/* ── Hero ──────────────────────────────────────────────────── */}
            <section style={{
                position: 'relative', overflow: 'hidden',
                padding: '5rem 2rem 3.5rem', textAlign: 'center',
                background: 'radial-gradient(ellipse at 50% 0%, #0a1628 0%, #050505 65%)',
            }}>
                <div style={{ position: 'absolute', top: '-60px', left: '-80px', width: '500px', height: '400px', background: 'radial-gradient(ellipse, rgba(42,182,251,0.12) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'orb-drift 10s ease-in-out infinite', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '20px', right: '-60px', width: '420px', height: '320px', background: 'radial-gradient(ellipse, rgba(168,85,247,0.10) 0%, transparent 70%)', filter: 'blur(36px)', animation: 'orb-drift 13s ease-in-out infinite reverse', pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 2, maxWidth: '820px', margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(42,182,251,0.08)', border: '1px solid rgba(42,182,251,0.2)', padding: '0.35rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2AB6FB', marginBottom: '1.5rem' }}>
                        ✦ Our Work
                    </div>
                    <h1 className="pflio-hero-h" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: '800', lineHeight: '1.15', letterSpacing: '-0.03em', background: 'linear-gradient(180deg, #fff 30%, #64748b 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.2rem' }}>
                        Client Portfolio
                    </h1>
                    <p className="pflio-hero-p" style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.75', maxWidth: '580px', margin: '0 auto' }}>
                        A curated showcase of brands we've grown — through digital marketing, creative content, and performance advertising.
                    </p>
                </div>
            </section>

            {/* ── Filter Bar ────────────────────────────────────────────── */}
            <div className="pflio-pills" style={{ padding: '2.5rem 2rem 0', maxWidth: '1100px', margin: '0 auto' }}>
                <div className="pflio-filter-bar" style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {filters.map(f => {
                        const active = f === activeFilter;
                        return (
                            <button key={f} className="pflio-pill" onClick={() => setActiveFilter(f)} style={{
                                padding: '0.45rem 1.1rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap',
                                background: active ? 'linear-gradient(135deg, #2AB6FB, #A855F7)' : 'rgba(255,255,255,0.05)',
                                color: active ? '#fff' : '#888',
                                opacity: !active && activeFilter !== 'All' ? 0.6 : 1,
                                outline: 'none',
                            }}>
                                {f}
                            </button>
                        );
                    })}
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#3f4f60' }}>
                    {filtered.length} client{filtered.length !== 1 ? 's' : ''}{activeFilter !== 'All' ? ` · ${activeFilter}` : ''}
                </div>
            </div>

            {/* ── Client Grid ───────────────────────────────────────────── */}
            <section style={{ padding: '2rem 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem 0', color: '#3f4f60' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3f4f60" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <p style={{ fontSize: '1rem' }}>No clients found for this filter yet.</p>
                    </div>
                ) : (
                    <div className="pflio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
                        {filtered.map(c => <ClientCard key={c.id} client={c} />)}
                        {/* Placeholder slots to hint at growth */}
                        <ComingSoonCard />
                        <ComingSoonCard />
                    </div>
                )}
            </section>

            {/* ── CTA ───────────────────────────────────────────────────── */}
            <section style={{ padding: '4rem 2rem 5rem', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
                <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: '1.2', marginBottom: '1rem' }}>
                    Want to be on this list?
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.75', marginBottom: '2.5rem' }}>
                    Let's build a campaign that gets results — and a portfolio entry worth showing off.
                </p>
                <Link to="/contact" style={{ display: 'inline-block', padding: '0.95rem 2.5rem', background: 'linear-gradient(135deg, #2AB6FB, #A855F7)', borderRadius: '6px', color: '#fff', fontWeight: '700', fontSize: '1rem', boxShadow: '0 0 30px rgba(42,182,251,0.25)' }}>
                    Start a Project →
                </Link>
            </section>

            <Footer />
        </div>
    );
};

export default Portfolio;
