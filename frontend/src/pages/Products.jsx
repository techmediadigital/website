import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SplashCursor from '../components/SplashCursor';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [pageContent, setPageContent] = useState(null);

    useEffect(() => {
        // Fetch only products
        fetch('/api/items')
            .then(res => res.json())
            .then(data => setProducts(data.filter(i => i.type === 'product')))
            .catch(err => console.error(err));

        fetch('/api/general')
            .then(res => res.json())
            .then(data => setPageContent(data.products))
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
                <h1 style={{ zIndex: 1 }}>{pageContent?.heroTitle || 'Our Products.'}</h1>
                <p style={{ zIndex: 1, color: '#ccc' }}>{pageContent?.heroSubtitle || 'Cutting-edge platforms engineered for scale.'}</p>
            </header>

            <section className="section">
                <div className="grid">
                    {products.length === 0 ? (
                        <div className="card" style={{ border: '1px dashed var(--glass-border)' }}>
                            <p style={{ textAlign: 'center', color: '#666' }}>No products available yet.</p>
                        </div>
                    ) : products.map(product => (
                        <div key={product.id} className="card" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{
                                textTransform: 'uppercase',
                                fontSize: '0.7rem',
                                letterSpacing: '0.1em',
                                color: '#fff',
                                background: 'var(--accent-color)',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px',
                                display: 'inline-block',
                                marginBottom: '1rem'
                            }}>New</div>
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <button className="btn" style={{ marginTop: '1.5rem', width: '100%', padding: '0.75rem' }}>View Details</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Products;
