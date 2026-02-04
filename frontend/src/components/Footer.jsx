import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    const [generalInfo, setGeneralInfo] = React.useState(null);

    React.useEffect(() => {
        fetch('/api/general')
            .then(res => res.json())
            .then(data => setGeneralInfo(data))
            .catch(err => console.error("Failed to fetch general info", err));
    }, []);

    if (!generalInfo) return null;

    const { footer, contact } = generalInfo;

    return (
        <footer style={{
            background: '#000',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '4rem 2rem 2rem',
            marginTop: 'auto'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '3rem',
                marginBottom: '3rem'
            }}>
                {/* Brand Column */}
                <div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <Link to="/" style={{ textDecoration: 'none', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
                            Techmediadigital<span style={{ color: 'var(--accent-color)' }}></span>
                        </Link>
                    </div>
                    <p style={{ color: '#888', lineHeight: '1.6', fontSize: '0.9rem' }}>
                        {footer?.description || "Empowering enterprises with intelligent digital architectures."}
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ color: '#fff', marginBottom: '1.5rem' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <li><Link to="/solutions" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.3s' }} className="footer-link">Solutions</Link></li>
                        <li><Link to="/products" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.3s' }} className="footer-link">Products</Link></li>
                        <li><Link to="/insights" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.3s' }} className="footer-link">Insights</Link></li>
                        <li><Link to="/company" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.3s' }} className="footer-link">Company</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 style={{ color: '#fff', marginBottom: '1.5rem' }}>Contact</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#888', fontSize: '0.9rem' }}>
                        <li>{contact?.addressLine1}</li>
                        <li>{contact?.addressLine2}</li>
                        <li>
                            <a href={`mailto:${contact?.email}`} style={{ color: '#fff', textDecoration: 'none' }}>{contact?.email}</a>
                        </li>
                    </ul>
                </div>

                {/* Social/Newsletter */}
                <div>
                    <h4 style={{ color: '#fff', marginBottom: '1.5rem' }}>Connect</h4>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {footer?.socialLinks?.facebook && (
                            <a href={footer.socialLinks.facebook} style={{ color: '#888', transition: 'all 0.3s', fontSize: '1.5rem' }} className="social-link" target="_blank" rel="noopener noreferrer">
                                <FaFacebook />
                            </a>
                        )}
                        {footer?.socialLinks?.instagram && (
                            <a href={footer.socialLinks.instagram} style={{ color: '#888', transition: 'all 0.3s', fontSize: '1.5rem' }} className="social-link" target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                        )}
                        {footer?.socialLinks?.linkedin && (
                            <a href={footer.socialLinks.linkedin} style={{ color: '#888', transition: 'all 0.3s', fontSize: '1.5rem' }} className="social-link" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                        )}
                        {footer?.socialLinks?.twitter && (
                            <a href={footer.socialLinks.twitter} style={{ color: '#888', transition: 'all 0.3s', fontSize: '1.5rem' }} className="social-link" target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </a>
                        )}
                        {footer?.socialLinks?.github && (
                            <a href={footer.socialLinks.github} style={{ color: '#888', transition: 'all 0.3s', fontSize: '1.5rem' }} className="social-link" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                paddingTop: '2rem',
                textAlign: 'center',
                color: '#444',
                fontSize: '0.8rem',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <p>&copy; {new Date().getFullYear()} Techmediadigital. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <a href="#" style={{ color: '#444', textDecoration: 'none' }}>Privacy Policy</a>
                    <a href="#" style={{ color: '#444', textDecoration: 'none' }}>Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
