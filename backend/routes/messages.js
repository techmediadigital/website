const express = require('express');
const router = express.Router();

let messages = [];

// GET all messages
router.get('/', (req, res) => {
    res.json(messages);
});

// POST new message
router.post('/', (req, res) => {
    const newMessage = {
        id: messages.length + 1,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
        date: new Date()
    };
    messages.unshift(newMessage); // Add to beginning
    res.status(201).json(newMessage);
});

module.exports = router;
