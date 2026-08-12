// to create server
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/healthz', (req, res) => {
    res.status(200).send('OK')
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// global error handler (catches errors passed via next(err) or thrown in async route handlers)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: "Internal server error"
    });
});

module.exports = app;