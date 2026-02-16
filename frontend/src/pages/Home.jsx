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
            <section id="products-list" className="section" style={{ background: 'rgba(255,255,255,0.02)', paddingTop: '0rem' }}>
                <h2 className="section-title">Our Services</h2>

                {/* Digital Marketing */}
                {products.filter(p => p.category === 'Digital Marketing').length > 0 && (
                    <>
                        <h3 style={{
                            fontSize: '1.5rem',
                            marginBottom: '1.5rem',
                            marginTop: '2rem',
                            color: 'var(--accent-color)',
                            fontWeight: '600'
                        }}>Digital Marketing</h3>
                        <div className="grid" style={{ marginBottom: '3rem' }}>
                            {products.filter(p => p.category === 'Digital Marketing').map(item => (
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
                    </>
                )}

                {/* Software Development */}
                {products.filter(p => p.category === 'Software Development').length > 0 && (
                    <>
                        <h3 style={{
                            fontSize: '1.5rem',
                            marginBottom: '1.5rem',
                            marginTop: '2rem',
                            color: 'var(--accent-color)',
                            fontWeight: '600'
                        }}>Software Development</h3>
                        <div className="grid" style={{ marginBottom: '3rem' }}>
                            {products.filter(p => p.category === 'Software Development').map(item => (
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
                    </>
                )}

                {/* AI & Data Solutions */}
                {products.filter(p => p.category === 'AI & Data Solutions').length > 0 && (
                    <>
                        <h3 style={{
                            fontSize: '1.5rem',
                            marginBottom: '1.5rem',
                            marginTop: '2rem',
                            color: 'var(--accent-color)',
                            fontWeight: '600'
                        }}>AI & Data Solutions</h3>
                        <div className="grid" style={{ marginBottom: '3rem' }}>
                            {products.filter(p => p.category === 'AI & Data Solutions').map(item => (
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
                    </>
                )}

                {/* Business Systems */}
                {products.filter(p => p.category === 'Business Systems').length > 0 && (
                    <>
                        <h3 style={{
                            fontSize: '1.5rem',
                            marginBottom: '1.5rem',
                            marginTop: '2rem',
                            color: 'var(--accent-color)',
                            fontWeight: '600'
                        }}>Business Systems</h3>
                        <div className="grid" style={{ marginBottom: '3rem' }}>
                            {products.filter(p => p.category === 'Business Systems').map(item => (
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
                    </>
                )}

                {/* Fallback for loading state */}
                {products.length === 0 && items.length === 0 && (
                    <div className="card">
                        <h3>Loading Services...</h3>
                    </div>
                )}
            </section>

            {/* Case Studies Section */}
            <section id="projects" className="section" style={{ background: '#0a0a0a', paddingTop: '0rem' }}>
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

            <Footer />
        </div>
    );
};

export default Home;
