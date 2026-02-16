const express = require('express');
const router = express.Router();

// In-memory data store with type support
// Types: 'service', 'project'
let items = [
    {
        id: 1,
        title: 'Enterprise Solutions',
        description: 'Custom-built specialized systems, CRM integrations (VaultRE), and scalable architectures for high-growth businesses.',
        type: 'service',
        image: '/assets/services/business-systems.png'
    },
    {
        id: 2,
        title: 'Data Intelligence',
        description: 'Advanced analytics, neural network architectures, and AI-driven insights to power decision making.',
        type: 'service',
        image: '/assets/services/ai-data.png'
    },
    {
        id: 3,
        title: 'Intelligent Automation',
        description: 'End-to-end workflow automation, cloud infrastructure, and security-first development.',
        type: 'service',
        image: '/assets/services/software-development.png'
    },
    {
        id: 4,
        title: 'Amber Real Estate',
        description: 'Complete digital transformation for a leading real estate group. 40% increase in lead generation.',
        type: 'project',
        image: '/assets/services/business-systems.png'
    },
    {
        id: 5,
        title: 'Global Logistics Core',
        description: 'AI-powered route optimization and fleet management dashboard.',
        type: 'project',
        image: '/assets/services/ai-data.png'
    },

    // Digital Marketing Category
    {
        id: 12,
        title: 'Search Engine Optimization (SEO)',
        description: 'Helps your business appear at the top when people search on Google.',
        type: 'product',
        category: 'Digital Marketing',
        image: '/assets/services/seo.png'
    },
    {
        id: 13,
        title: 'Social Media Marketing (SMM)',
        description: 'Engaging and advertising through platforms like Facebook and Instagram.',
        type: 'product',
        category: 'Digital Marketing',
        image: '/assets/services/smm.png'
    },
    {
        id: 14,
        title: 'Pay-Per-Click (PPC) Advertising',
        description: 'Paying to appear prominently in search results using platforms like Google Ads.',
        type: 'product',
        category: 'Digital Marketing',
        image: '/assets/services/ppc.png'
    },
    {
        id: 15,
        title: 'Content Marketing & Creation',
        description: 'Attracting customers with high-quality blogs, videos, and graphics to drive engagement.',
        type: 'product',
        category: 'Digital Marketing',
        image: '/assets/services/content-marketing.png'
    },
    {
        id: 16,
        title: 'Email Marketing',
        description: 'Sending special offers and updates to customers via email.',
        type: 'product',
        category: 'Digital Marketing',
        image: '/assets/services/email-marketing.png'
    },
    {
        id: 24,
        title: 'Data-Driven Digital Marketing',
        description: 'Marketing strategies augmented by data analytics for better targeting and ROI.',
        type: 'product',
        category: 'Digital Marketing',
        image: '/assets/services/data-marketing.png'
    },
    {
        id: 25,
        title: 'Strategy Marketing',
        description: 'Long-term marketing strategies to achieve sustainable business growth.',
        type: 'product',
        category: 'Digital Marketing',
        image: '/assets/services/strategy-marketing.png'
    },


    // Software Development Category
    {
        id: 17,
        title: 'Custom Web & Mobile Solutions',
        description: 'Bespoke software, web, and mobile app development tailored to your specific business challenges.',
        type: 'product',
        category: 'Software Development',
        image: '/assets/services/software-custom.png'
    },

    {
        id: 21,
        title: 'E-commerce Software',
        description: 'Comprehensive e-commerce platforms to manage online sales and inventory.',
        type: 'product',
        category: 'Software Development',
        image: '/assets/services/software-ecommerce.png'
    },
    {
        id: 22,
        title: 'Hospitality Management System',
        description: 'Integrated software for managing hotels, resorts, and hospitality businesses.',
        type: 'product',
        category: 'Software Development',
        image: '/assets/services/software-hospitality.png'
    },

    // AI & Data Solutions Category
    {
        id: 23,
        title: 'AI Chatbot',
        description: 'Advanced AI-powered chatbots to automate customer support and engagement.',
        type: 'product',
        category: 'AI & Data Solutions',
        image: '/assets/services/ai-chatbot.png'
    },
    {
        id: 27,
        title: 'Data Analytics',
        description: 'In-depth data analysis to uncover actionable insights and trends.',
        type: 'product',
        category: 'AI & Data Solutions',
        image: '/assets/services/data-analytics.png'
    },
    {
        id: 28,
        title: 'AI',
        description: 'Artificial Intelligence solutions to automate processes and enhance decision-making.',
        type: 'product',
        category: 'AI & Data Solutions',
        image: '/assets/services/ai-general.png'
    },
    {
        id: 29,
        title: 'Computer Vision',
        description: 'Image and video analysis technology for automated visual inspection and recognition.',
        type: 'product',
        category: 'AI & Data Solutions',
        image: '/assets/services/computer-vision.png'
    },

    // Business Systems Category
    {
        id: 18,
        title: 'CRM',
        description: 'Customer Relationship Management systems to manage interactions with current and potential customers.',
        type: 'product',
        category: 'Business Systems',
        image: '/assets/services/business-systems.png'
    },
    {
        id: 19,
        title: 'ERP',
        description: 'Enterprise Resource Planning software to manage day-to-day business activities.',
        type: 'product',
        category: 'Business Systems',
        image: '/assets/services/business-systems.png'
    }
];

// GET all items
router.get('/', (req, res) => {
    res.json(items);
});

// POST new item
router.post('/', (req, res) => {
    const newItem = {
        id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
        title: req.body.title,
        description: req.body.description,
        type: req.body.type || 'service', // Default to service
        category: req.body.category || null // Optional category field
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT update item
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === id);

    if (index !== -1) {
        items[index] = { ...items[index], ...req.body };
        res.json(items[index]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// DELETE item
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    items = items.filter(item => item.id !== id);
    res.json({ message: 'Item deleted' });
});

module.exports = router;
