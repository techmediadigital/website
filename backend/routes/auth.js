const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key'; // In a real app, use env vars

// Login Route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Hardcoded Admin Credentials
    if (username === 'techmediadigital.com' && password === 'techmedia321') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
