import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SplashCursor from '../components/SplashCursor';


const Home = () => {
    const [items, setItems] = useState([]);
    const [pageContent, setPageContent] = useState(null);

    useEffect(() => {
        fetch('/api/items')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error("Failed to load items", err));

        fetch('/api/general')
            .then(res => res.json())
            .then(data => setPageContent(data.home))
            .catch(err => console.error("Failed to load page content", err));
    }, []);

    const services = items.filter(i => i.type === 'service');
    const products = items.filter(i => i.type === 'product');
    const projects = items.filter(i => i.type === 'project');

    return (
        <div className="home-container">
            {/* Carousel CSS */}
            <style>{`
                @keyframes marquee-ltr {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-33.3333%); }
                }
                @keyframes marquee-rtl {
                    0%   { transform: translateX(-33.3333%); }
                    100% { transform: translateX(0); }
                }
                .dm-track  { display:flex; width:max-content; animation: marquee-ltr 28s linear infinite; }
                .sd-track  { display:flex; width:max-content; animation: marquee-rtl 32s linear infinite; }
                .ai-track  { display:flex; width:max-content; animation: marquee-ltr 24s linear infinite; }
                .bs-track  { display:flex; width:max-content; animation: marquee-rtl 30s linear infinite; }
                .dm-track:hover, .sd-track:hover, .ai-track:hover, .bs-track:hover {
                    animation-play-state: paused;
                }
            `}</style>
            {/* Hero Section */}
            <header className="hero">
                <SplashCursor />
                <div style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '800px',
                    height: '400px',
                    background: 'radial-gradient(ellipse at center, rgba(42,182,251,0.15) 0%, rgba(0,0,0,0) 70%)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}></div>

                {/* Decorative Grid */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '100px 100px',
                    opacity: 0.3,
                    zIndex: 1
                }}></div>

                <h1>{pageContent?.heroTitle || 'Transforming Businesses Through Digital Engineering'}</h1>
                <p>{pageContent?.heroSubtitle || 'We build high-performance digital ecosystems for global businesses and enterprises. Secure. Scalable. Future-ready.'}</p>
                <div style={{ display: 'flex', gap: '1rem', zIndex: 2 }}>
                    <button className="btn">Start Project</button>
                    <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>Our Expertise</button>
                </div>
            </header>

            {/* Services Section */}
            <section id="services" className="section" style={{ paddingTop: '0rem' }}>
                <h2 className="section-title">Capabilities</h2>
                <div className="grid">
                    {/* Always show at least these if items are empty */}
                    {services.length === 0 && items.length === 0 ? (
                        <>
                            <div className="card">
                                <h3>Enterprise Solutions</h3>
                                <p>Scalable architectures for high-growth businesses. (Loading more...)</p>
                            </div>
                            <div className="card">
                                <h3>Data Intelligence</h3>
                                <p>AI-driven insights and analytics. (Loading more...)</p>
                            </div>
                        </>
                    ) : services.map(item => (
                        <div key={item.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderTopLeftRadius: 'inherit',
                                        borderTopRightRadius: 'inherit',
                                        display: 'block'
                                    }}
                                />
                            )}
                            <div style={{ padding: '1.5rem' }}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Products Section - Categorized */}
            <section id="products-list" className="section section--full" style={{ background: 'transparent', paddingTop: '0rem' }}>
                <h2 className="section-title">Our Services</h2>

                {/* Digital Marketing */}
                {products.filter(p => p.category === 'Digital Marketing').length > 0 && (() => {
                    const dmItems = products.filter(p => p.category === 'Digital Marketing');
                    const useCarousel = dmItems.length > 3;
                    const loopItems = useCarousel ? [...dmItems, ...dmItems, ...dmItems] : dmItems;
                    const renderCard = (item, idx) => (
                        <div key={`${item.id}-${idx}`}
                            style={{ flex: useCarousel ? '0 0 300px' : undefined, width: useCarousel ? '300px' : undefined, marginRight: useCarousel ? '1.25rem' : undefined, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', overflow: 'hidden', transition: 'border-color 0.25s, transform 0.25s', cursor: 'default' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(42,182,251,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            {item.image && <img src={item.image} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />}
                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '0.5rem', padding: '2px 8px', background: 'rgba(42,182,251,0.1)', borderRadius: '4px' }}>Digital Marketing</div>
                                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: '600', lineHeight: '1.4' }}>{item.title}</h3>
                                <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>{item.description}</p>
                            </div>
                        </div>
                    );
                    return (
                        <>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', marginTop: '2rem', color: 'var(--accent-color)', fontWeight: '600' }}>Digital Marketing</h3>
                            {useCarousel ? (
                                <div className="carousel-bleed" style={{ overflow: 'hidden', marginBottom: '3rem', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
                                    <div className="dm-track">{loopItems.map(renderCard)}</div>
                                </div>
                            ) : (
                                <div className="grid" style={{ marginBottom: '3rem' }}>{dmItems.map(renderCard)}</div>
                            )}
                        </>
                    );
                })()}

                {/* Software Development */}
                {products.filter(p => p.category === 'Software Development').length > 0 && (() => {
                    const sdItems = products.filter(p => p.category === 'Software Development');
                    const useCarousel = sdItems.length > 3;
                    const loopItems = useCarousel ? [...sdItems, ...sdItems, ...sdItems] : sdItems;
                    const renderCard = (item, idx) => (
                        <div key={`${item.id}-${idx}`}
                            style={{ flex: useCarousel ? '0 0 300px' : undefined, width: useCarousel ? '300px' : undefined, marginRight: useCarousel ? '1.25rem' : undefined, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', overflow: 'hidden', transition: 'border-color 0.25s, transform 0.25s', cursor: 'default' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(42,182,251,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            {item.image && <img src={item.image} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />}
                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '0.5rem', padding: '2px 8px', background: 'rgba(42,182,251,0.1)', borderRadius: '4px' }}>Software Dev</div>
                                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: '600', lineHeight: '1.4' }}>{item.title}</h3>
                                <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>{item.description}</p>
                            </div>
                        </div>
                    );
                    return (
                        <>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', marginTop: '2rem', color: 'var(--accent-color)', fontWeight: '600' }}>Software Development</h3>
                            {useCarousel ? (
                                <div className="carousel-bleed" style={{ overflow: 'hidden', marginBottom: '3rem', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
                                    <div className="sd-track">{loopItems.map(renderCard)}</div>
                                </div>
                            ) : (
                                <div className="grid" style={{ marginBottom: '3rem' }}>{sdItems.map(renderCard)}</div>
                            )}
                        </>
                    );
                })()}

                {/* AI & Data Solutions */}
                {products.filter(p => p.category === 'AI & Data Solutions').length > 0 && (() => {
                    const aiItems = products.filter(p => p.category === 'AI & Data Solutions');
                    const useCarousel = aiItems.length > 3;
                    const loopItems = useCarousel ? [...aiItems, ...aiItems, ...aiItems] : aiItems;
                    const renderCard = (item, idx) => (
                        <div key={`${item.id}-${idx}`}
                            style={{ flex: useCarousel ? '0 0 300px' : undefined, width: useCarousel ? '300px' : undefined, marginRight: useCarousel ? '1.25rem' : undefined, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', overflow: 'hidden', transition: 'border-color 0.25s, transform 0.25s', cursor: 'default' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(42,182,251,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            {item.image && <img src={item.image} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />}
                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '0.5rem', padding: '2px 8px', background: 'rgba(42,182,251,0.1)', borderRadius: '4px' }}>AI &amp; Data</div>
                                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: '600', lineHeight: '1.4' }}>{item.title}</h3>
                                <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>{item.description}</p>
                            </div>
                        </div>
                    );
                    return (
                        <>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', marginTop: '2rem', color: 'var(--accent-color)', fontWeight: '600' }}>AI &amp; Data Solutions</h3>
                            {useCarousel ? (
                                <div className="carousel-bleed" style={{ overflow: 'hidden', marginBottom: '3rem', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
                                    <div className="ai-track">{loopItems.map(renderCard)}</div>
                                </div>
                            ) : (
                                <div className="grid" style={{ marginBottom: '3rem' }}>{aiItems.map(renderCard)}</div>
                            )}
                        </>
                    );
                })()}

                {/* Business Systems */}
                {products.filter(p => p.category === 'Business Systems').length > 0 && (() => {
                    const bsItems = products.filter(p => p.category === 'Business Systems');
                    const useCarousel = bsItems.length > 3;
                    const loopItems = useCarousel ? [...bsItems, ...bsItems, ...bsItems] : bsItems;
                    const renderCard = (item, idx) => (
                        <div key={`${item.id}-${idx}`}
                            style={{ flex: useCarousel ? '0 0 300px' : undefined, width: useCarousel ? '300px' : undefined, marginRight: useCarousel ? '1.25rem' : undefined, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', overflow: 'hidden', transition: 'border-color 0.25s, transform 0.25s', cursor: 'default' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(42,182,251,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            {item.image && <img src={item.image} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />}
                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '0.5rem', padding: '2px 8px', background: 'rgba(42,182,251,0.1)', borderRadius: '4px' }}>Business Systems</div>
                                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: '600', lineHeight: '1.4' }}>{item.title}</h3>
                                <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>{item.description}</p>
                            </div>
                        </div>
                    );
                    return (
                        <>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', marginTop: '2rem', color: 'var(--accent-color)', fontWeight: '600' }}>Business Systems</h3>
                            {useCarousel ? (
                                <div className="carousel-bleed" style={{ overflow: 'hidden', marginBottom: '3rem', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
                                    <div className="bs-track">{loopItems.map(renderCard)}</div>
                                </div>
                            ) : (
                                <div className="grid" style={{ marginBottom: '3rem' }}>{bsItems.map(renderCard)}</div>
                            )}
                        </>
                    );
                })()}

                {/* Fallback for loading state */}
                {products.length === 0 && items.length === 0 && (
                    <div className="card">
                        <h3>Loading Services...</h3>
                    </div>
                )}
            </section>

            {/* Case Studies Section */}
            <section id="projects" className="section section--full" style={{ background: '#0a0a0a', paddingTop: '0rem' }}>
                <h2 className="section-title">Selected Works</h2>
                <div className="grid">
                    {projects.length === 0 && items.length === 0 ? (
                        <div className="card" style={{ background: 'linear-gradient(45deg, #111, #000)' }}>
                            <div style={{ textTransform: 'uppercase', color: 'var(--accent-color)', fontSize: '0.8rem', marginBottom: '1rem' }}>Case Study</div>
                            <h3>Amber Real Estate</h3>
                            <p>Digital Transformation Reference. (Loading...)</p>
                        </div>
                    ) : projects.map(item => (
                        <div key={item.id} className="card" style={{ background: 'linear-gradient(45deg, #111, #000)' }}>
                            <div style={{
                                textTransform: 'uppercase',
                                fontSize: '0.8rem',
                                color: 'var(--accent-color)',
                                marginBottom: '1rem'
                            }}>Case Study</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.9rem', cursor: 'pointer' }}>
                                Read Case Study &rarr;
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="section" style={{ background: '#050505', paddingTop: '4rem', paddingBottom: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Why Choose Us</h2>
                    <p style={{ color: '#888', fontSize: '1.1rem' }}>We deliver excellence in every project we undertake</p>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {/* Card 1: Lightning Fast */}
                    <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ color: '#00f2ea', marginBottom: '1.5rem' }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                        </div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Lightning Fast</h3>
                        <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            Optimized for speed with cutting-edge tech stack ensuring blazing fast load times.
                        </p>
                    </div>

                    {/* Card 2: Secure & Reliable */}
                    <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ color: '#00f2ea', marginBottom: '1.5rem' }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Secure & Reliable</h3>
                        <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            Enterprise-grade security with SSL, backups, and 99.9% uptime guarantee.
                        </p>
                    </div>

                    {/* Card 3: On-Time Delivery */}
                    <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ color: '#ffd700', marginBottom: '1.5rem' }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>On-Time Delivery</h3>
                        <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            We respect deadlines. Your project will be delivered on time, every time.
                        </p>
                    </div>

                    {/* Card 4: 24/7 Support */}
                    <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ color: '#ff4081', marginBottom: '1.5rem' }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>24/7 Support</h3>
                        <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            Round-the-clock support to keep your website running smoothly at all times.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
