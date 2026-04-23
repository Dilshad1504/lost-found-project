const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🎒 Lost & Found API is running',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/register',
        login: 'POST /api/login',
        dashboard: 'GET /api/dashboard (Protected)',
      },
      items: {
        create: 'POST /api/items (Protected)',
        getAll: 'GET /api/items (Protected)',
        getById: 'GET /api/items/:id (Protected)',
        update: 'PUT /api/items/:id (Protected)',
        delete: 'DELETE /api/items/:id (Protected)',
        search: 'GET /api/items/search?name=xyz (Protected)',
      },
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});
