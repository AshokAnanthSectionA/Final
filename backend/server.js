require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); 
const path = require('path');

// Import your route files
const bookRoutes = require('./routes/books.routes');
const userRoutes = require('./routes/users.routes'); 
const orderRoutes = require('./routes/orders.routes');

const app = express();
const port = 5000; 


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS for cross-origin requests (for development)
app.use(cors());

// --- MongoDB Connection ---
const uri = process.env.MONGODB_CONNECTION_STRING; // Get URI from .env

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- Mount your API routes ---
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/orders', orderRoutes);

// Dummy product data (for now)
const dummyProducts = [
    { id: 1, name: 'The Secret Garden', author: 'Frances Hodgson Burnett', price: 10.99 },
    { id: 2, name: 'Pride and Prejudice', author: 'Jane Austen', price: 9.50 },
    { id: 3, name: 'To Kill a Mockingbird', author: 'Harper Lee', price: 12.75 },
];

// Dummy user data (for now)
const dummyUsers = [];

// --- Backend Routes will be added here ---

// Login route


// Register route


// Logout route (basic - no actual session management yet)
app.post('/api/logout', (req, res) => {
    console.log('Received logout request');
    res.json({ message: 'Logout request received on the server' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
