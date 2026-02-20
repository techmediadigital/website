import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href="https://wa.me/+919847272532"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                backgroundColor: '#25D366',
                color: 'white',
                borderRadius: '50px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: hovered ? '0 1.25rem 0 1rem' : '0 0.75rem',
                boxShadow: hovered
                    ? '0 6px 24px rgba(37,211,102,0.45)'
                    : '0 4px 12px rgba(0,0,0,0.3)',
                zIndex: 1000,
                textDecoration: 'none',
                overflow: 'hidden',
                transition: 'padding 0.35s ease, box-shadow 0.3s ease',
                whiteSpace: 'nowrap',
            }}
        >
            <FaWhatsapp size={26} style={{ flexShrink: 0 }} />
            <span
                style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    letterSpacing: '0.02em',
                    maxWidth: hovered ? '120px' : '0px',
                    opacity: hovered ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-width 0.35s ease, opacity 0.25s ease',
                }}
            >
                Chat with us
            </span>
        </a>
    );
};

export default WhatsAppButton;
