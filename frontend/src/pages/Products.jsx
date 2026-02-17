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
                        <div key={product.id} className="card" style={{ padding: 0, overflow: 'hidden', background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column' }}>
                            {product.image && (
                                <img
                                    src={product.image}
                                    alt={product.title}
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
                            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <h3>{product.title}</h3>
                                <p style={{ marginBottom: '1.5rem' }}>{product.description}</p>
                                <button className="btn" style={{ marginTop: 'auto', width: '100%', padding: '0.75rem' }}>View Details</button>
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

export default Products;
