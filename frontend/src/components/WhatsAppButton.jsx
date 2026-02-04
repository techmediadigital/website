import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
    return (
        <a
            className="whatsapp-float"
            href="https://wa.me/15551234567" // Placeholder number
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                backgroundColor: '#25D366',
                color: 'white',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                zIndex: 1000,
                transition: 'box-shadow 0.3s ease',
                textDecoration: 'none'
            }}
        >
            <FaWhatsapp size={28} />
        </a>
    );
};

export default WhatsAppButton;
