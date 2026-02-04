import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SplashCursor from '../components/SplashCursor';


const Solutions = () => {
    const [services, setServices] = useState([]);
    const [pageContent, setPageContent] = useState(null);

    useEffect(() => {
        // Fetch only services
        fetch('/api/items')
            .then(res => res.json())
            .then(data => setServices(data.filter(i => i.type === 'service')))
            .catch(err => console.error(err));

        fetch('/api/general')
            .then(res => res.json())
            .then(data => setPageContent(data.solutions))
            .catch(err => console.error("Failed to load page content", err));
    }, []);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            <header className="hero" style={{ minHeight: '60vh' }}>
                <SplashCursor />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '600px',
                    height: '600px',
                    background: 'rgba(42, 182, 251, 0.05)',
                    filter: 'blur(120px)',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 0
                }}></div>
                <h1 style={{ zIndex: 1 }}>{pageContent?.heroTitle || 'Our Solutions.'}</h1>
                <p style={{ zIndex: 1, color: '#ccc' }}>{pageContent?.heroSubtitle || 'Architecting the future of enterprise technology.'}</p>
            </header>

            <section className="section">
                <div className="grid">
                    {services.length === 0 ? (
                        <p>Loading solutions...</p>
                    ) : services.map(service => (
                        <div key={service.id} className="card" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                background: 'var(--accent-glow)',
                                borderRadius: '12px',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff'
                            }}>
                                {/* Icon Placeholder */}
                                <span style={{ fontSize: '1.5rem' }}>⚡</span>
                            </div>
                            <h3>{service.title}</h3>
                            <p style={{ marginTop: '1rem' }}>{service.description}</p>
                            <ul style={{ marginTop: '2rem', paddingLeft: '1rem', color: '#888', fontSize: '0.9rem', lineHeight: '1.8' }}>
                                <li>Scalable Architecture</li>
                                <li>Secure Implementation</li>
                                <li>24/7 Support</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Solutions;
