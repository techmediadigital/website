import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SplashCursor from '../components/SplashCursor';


const Company = () => {
    const [companyInfo, setCompanyInfo] = useState(null);

    useEffect(() => {
        fetch('/api/general')
            .then(res => res.json())
            .then(data => setCompanyInfo(data.company))
            .catch(err => console.error("Failed to fetch company info", err));
    }, []);

    if (!companyInfo) return <div style={{ minHeight: '100vh', background: '#000' }}></div>;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Mission Hero */}
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
                    borderRadius: '50%',
                    zIndex: 0
                }}></div>
                <h1 style={{ zIndex: 1 }}>Our Mission.</h1>
                <p style={{ zIndex: 1, maxWidth: '800px', fontSize: '1.2rem', color: '#ccc' }}>
                    {companyInfo.mission}
                </p>
            </header>

            {/* Values Section */}
            <section className="section">
                <div className="grid">
                    <div className="card">
                        <div style={{ color: 'var(--accent-color)', marginBottom: '1rem', fontSize: '2rem' }}>01</div>
                        <h3>Vision</h3>
                        <p>{companyInfo.vision}</p>
                    </div>
                    <div className="card">
                        <div style={{ color: 'var(--accent-color)', marginBottom: '1rem', fontSize: '2rem' }}>02</div>
                        <h3>Integrity</h3>
                        <p>We build with code, but we lead with trust. Data privacy, security, and ethical engineering are the cornerstones of every architecture we design.</p>
                    </div>
                    <div className="card">
                        <div style={{ color: 'var(--accent-color)', marginBottom: '1rem', fontSize: '2rem' }}>03</div>
                        <h3>Innovation</h3>
                        <p>We don't just follow trends; we engineer the future. From neural networks to decentralized platforms, we push the boundaries of what is possible.</p>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: '#0a0a0a', textAlign: 'center' }}>
                <h2 className="section-title" style={{ border: 'none', textAlign: 'center' }}>Join the Revolution</h2>
                <p style={{ color: '#999', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    We are always looking for visionary engineers and thinkers.
                </p>
                <button className="btn">View Careers</button>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Company;
