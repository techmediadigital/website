const express = require('express');
const router = express.Router();

// In-memory store for general content
let generalInfo = {
    company: {
        mission: "To empower enterprises with intelligent digital architectures that drive sustainable growth, resilience, and technological sovereignty.",
        vision: "We envision a world where digital ecosystems are not just tools, but living, breathing extensions of human potential—secure, adaptive, and infinitely scalable.",
        values: [
            { title: "Vision", description: "We envision a world where digital ecosystems are not just tools, but living, breathing extensions of human potential—secure, adaptive, and infinitely scalable." },
            { title: "Integrity", description: "We build with code, but we lead with trust. Data privacy, security, and ethical engineering are the cornerstones of every architecture we design." },
            { title: "Innovation", description: "We don't just follow trends; we engineer the future. From neural networks to decentralized platforms, we push the boundaries of what is possible." }
        ]
    },
    contact: {
        addressLine1: "123 Innovation Drive",
        addressLine2: "Tech District, CA 94025",
        email: "hello@techmedia.digital",
        phone: "+1 (555) 123-4567"
    },
    home: {
        heroTitle: "Transforming Businesses Through Digital Engineering",
        heroSubtitle: "We build high-performance digital ecosystems for global businesses and enterprises. Secure. Scalable. Future-ready.",
        heroBtnPrimary: "Start Project",
        heroBtnSecondary: "Our Expertise"
    },
    solutions: {
        heroTitle: "Our Solutions.",
        heroSubtitle: "Architecting the future of enterprise technology."
    },
    products: {
        heroTitle: "Our Products.",
        heroSubtitle: "Cutting-edge platforms engineered for scale."
    },
    insights: {
        heroTitle: "Insights & Case Studies.",
        heroSubtitle: "Deep dives into digital transformation success stories."
    },
    footer: {
        description: "Empowering enterprises with intelligent digital architectures, AI-driven insights, and future-proof software solutions.",
        socialLinks: {
            facebook: "#",
            instagram: "#",
            linkedin: "#",
            twitter: "#",
            github: "#"
        }
    }
};

// GET general info
router.get('/', (req, res) => {
    res.json(generalInfo);
});

// PUT update general info
router.put('/', (req, res) => {
    generalInfo = { ...generalInfo, ...req.body };
    res.json(generalInfo);
});

module.exports = router;
