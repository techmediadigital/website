import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SplashCursor from '../components/SplashCursor';
import Footer from '../components/Footer';


const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [contactInfo, setContactInfo] = useState(null);

    useEffect(() => {
        fetch('/api/general')
            .then(res => res.json())
            .then(data => setContactInfo(data.contact))
            .catch(err => console.error("Failed to fetch contact info", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert('Thank you for your message. We will contact you shortly.');
                setFormData({ name: '', email: '', message: '' });
            }
        } catch (err) {
            console.error("Failed to send message", err);
            alert("Failed to send message. Please try again.");
        }
    };

    if (!contactInfo) return <div style={{ minHeight: '100vh', background: '#000' }}></div>;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Hero Section */}

            {/* Hero Section */}
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
                <h1 style={{ zIndex: 1 }}>Get in Touch.</h1>
                <p style={{ zIndex: 1, color: '#ccc' }}>Ready to transform your digital ecosystem? Let's talk.</p>
            </header>

            {/* Contact Content Section */}
            <section className="section" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'start' }}>

                    {/* Contact Info */}
                    <div>
                        <div className="card" style={{ marginBottom: '2rem', height: '100%' }}>
                            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Global HQ</h3>
                            <p style={{ fontSize: '1.1rem', color: '#fff' }}>{contactInfo.addressLine1}</p>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{contactInfo.addressLine2}</p>

                            <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '2rem 0' }} />

                            <div style={{ marginBottom: '1rem' }}>
                                <span style={{ display: 'block', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email Us</span>
                                <a href={`mailto:${contactInfo.email}`} style={{ fontSize: '1.2rem', color: '#fff' }}>{contactInfo.email}</a>
                            </div>

                            <div>
                                <span style={{ display: 'block', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Call Us</span>
                                <span style={{ fontSize: '1.2rem' }}>{contactInfo.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card" style={{ background: '#050505', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                    style={{ background: 'rgba(255,255,255,0.03)' }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="john@example.com"
                                    style={{ background: 'rgba(255,255,255,0.03)' }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Tell us about your project</label>
                                <textarea
                                    rows="5"
                                    required
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="How can we help you?"
                                    style={{ background: 'rgba(255,255,255,0.03)' }}
                                />
                            </div>
                            <button type="submit" className="btn" style={{ width: '100%', background: '#fff', color: '#000', border: 'none' }}>Send Message</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Contact;
