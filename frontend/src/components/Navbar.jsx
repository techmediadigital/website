
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();
    const navRef = React.useRef(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Close menu when route changes
    React.useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

    return (
        <nav className="navbar" ref={navRef}>
            <div className="nav-logo">
                <Link to="/" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Techmedia Logo" style={{ height: '60px' }} />
                    <span style={{ marginLeft: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>TechMediaDigital</span>
                </Link>
            </div>

            <div className="hamburger" onClick={toggleMenu}>
                <span className={isMenuOpen ? "bar active" : "bar"}></span>
                <span className={isMenuOpen ? "bar active" : "bar"}></span>
                <span className={isMenuOpen ? "bar active" : "bar"}></span>
            </div>

            <div className={`nav-group ${isMenuOpen ? 'active' : ''}`}>
                <div className="nav-links">
                    <Link to="/solutions" className={isActive('/solutions')}>Solutions</Link>
                    <Link to="/products" className={isActive('/products')}>Products</Link>
                    <Link to="/insights" className={isActive('/insights')}>Insights</Link>
                    <Link to="/company" className={isActive('/company')}>Company</Link>
                </div>
                <div className="nav-actions">
                    <Link to="/contact" className="nav-btn">Get in Touch</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
