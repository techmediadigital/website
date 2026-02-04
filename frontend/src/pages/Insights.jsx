import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SplashCursor from '../components/SplashCursor';


const Insights = () => {
    const [projects, setProjects] = useState([]);
    const [pageContent, setPageContent] = useState(null);

    useEffect(() => {
        // Fetch only projects (Case Studies)
        fetch('/api/items')
            .then(res => res.json())
            .then(data => setProjects(data.filter(i => i.type === 'project')))
            .catch(err => console.error(err));

        fetch('/api/general')
            .then(res => res.json())
            .then(data => setPageContent(data.insights))
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
                <h1 style={{ zIndex: 1 }}>{pageContent?.heroTitle || 'Insights & Case Studies.'}</h1>
                <p style={{ zIndex: 1, color: '#ccc' }}>{pageContent?.heroSubtitle || 'Deep dives into digital transformation success stories.'}</p>
            </header>

            <section className="section">
                <div className="grid">
                    {projects.length === 0 ? (
                        <div className="card" style={{ background: 'linear-gradient(45deg, #111, #000)' }}>
                            <h3>Amber Real Estate</h3>
                            <p>Loading...</p>
                        </div>
                    ) : projects.map(project => (
                        <div key={project.id} className="card" style={{ background: 'linear-gradient(145deg, #0a0a0a, #000)' }}>
                            <div style={{
                                textTransform: 'uppercase',
                                color: 'var(--accent-color)',
                                fontSize: '0.75rem',
                                marginBottom: '1rem',
                                letterSpacing: '0.1em'
                            }}>
                                Case Study
                            </div>
                            <h3 style={{ fontSize: '1.75rem' }}>{project.title}</h3>
                            <p style={{ marginBottom: '2rem' }}>{project.description}</p>
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.9rem', color: '#666' }}>Dec 28, 2024</span>
                                <span style={{ color: '#fff', cursor: 'pointer' }}>Read Article &rarr;</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Insights;
