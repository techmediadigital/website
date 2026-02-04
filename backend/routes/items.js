const express = require('express');
const router = express.Router();

// In-memory data store with type support
// Types: 'service', 'project'
let items = [
    {
        id: 1,
        title: 'Enterprise Solutions',
        description: 'Custom-built specialized systems, CRM integrations (VaultRE), and scalable architectures for high-growth businesses.',
        type: 'service'
    },
    {
        id: 2,
        title: 'Data Intelligence',
        description: 'Advanced analytics, neural network architectures, and AI-driven insights to power decision making.',
        type: 'service'
    },
    {
        id: 3,
        title: 'Intelligent Automation',
        description: 'End-to-end workflow automation, cloud infrastructure, and security-first development.',
        type: 'service'
    },
    {
        id: 4,
        title: 'Amber Real Estate',
        description: 'Complete digital transformation for a leading real estate group. 40% increase in lead generation.',
        type: 'project'
    },
    {
        id: 5,
        title: 'Global Logistics Core',
        description: 'AI-powered route optimization and fleet management dashboard.',
        type: 'project'
    },

    {
        id: 12,
        title: 'Search Engine Optimization (SEO)',
        description: 'Helps your business appear at the top when people search on Google.',
        type: 'product'
    },
    {
        id: 13,
        title: 'Social Media Marketing (SMM)',
        description: 'Engaging and advertising through platforms like Facebook and Instagram.',
        type: 'product'
    },
    {
        id: 14,
        title: 'Pay-Per-Click (PPC) Advertising',
        description: 'Paying to appear prominently in search results using platforms like Google Ads.',
        type: 'product'
    },
    {
        id: 15,
        title: 'Content Marketing',
        description: 'Attracting customers by providing valuable information through blogs, videos, and other content formats.',
        type: 'product'
    },
    {
        id: 16,
        title: 'Email Marketing',
        description: 'Sending special offers and updates to customers via email.',
        type: 'product'
    },
    {
        id: 17,
        title: 'Web and Mobile Applications',
        description: 'Custom web and mobile app development tailored to your business needs.',
        type: 'product'
    },
    {
        id: 18,
        title: 'CRM',
        description: 'Customer Relationship Management systems to manage interactions with current and potential customers.',
        type: 'product'
    },
    {
        id: 19,
        title: 'ERP',
        description: 'Enterprise Resource Planning software to manage day-to-day business activities.',
        type: 'product'
    },
    {
        id: 20,
        title: 'Custom Software',
        description: 'Bespoke software solutions designed to address your specific business challenges.',
        type: 'product'
    },
    {
        id: 21,
        title: 'E-commerce Software',
        description: 'Comprehensive e-commerce platforms to manage online sales and inventory.',
        type: 'product'
    },
    {
        id: 22,
        title: 'Hospitality Management System',
        description: 'Integrated software for managing hotels, resorts, and hospitality businesses.',
        type: 'product'
    },
    {
        id: 23,
        title: 'AI Chatbot',
        description: 'Advanced AI-powered chatbots to automate customer support and engagement.',
        type: 'product'
    },
    {
        id: 24,
        title: 'Data-Driven Digital Marketing',
        description: 'Marketing strategies augmented by data analytics for better targeting and ROI.',
        type: 'product'
    },
    {
        id: 25,
        title: 'Strategy Marketing',
        description: 'Long-term marketing strategies to achieve sustainable business growth.',
        type: 'product'
    },
    {
        id: 26,
        title: 'Content Creation',
        description: 'High-quality content production including blogs, videos, and graphics.',
        type: 'product'
    },
    {
        id: 27,
        title: 'Data Analytics',
        description: 'In-depth data analysis to uncover actionable insights and trends.',
        type: 'product'
    },
    {
        id: 28,
        title: 'AI',
        description: 'Artificial Intelligence solutions to automate processes and enhance decision-making.',
        type: 'product'
    },
    {
        id: 29,
        title: 'Computer Vision',
        description: 'Image and video analysis technology for automated visual inspection and recognition.',
        type: 'product'
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
        type: req.body.type || 'service' // Default to service
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
