const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');

app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/messages', require('./routes/messages'));
app.use('/api/general', require('./routes/general'));

// const adminRoutes = require('./routes/admin');
// app.use('/api/admin', adminRoutes);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
