const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// GET all users (for admin purposes - consider security)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords from the response
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new user (registration)
router.post('/register', async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    // Consider returning a limited user object without the password
    const { password, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) an existing user by ID
router.put('/:id', async (req, res) => {
  // Prevent updating the password through this route for security
  if (req.body.password) {
    return res.status(400).json({ message: 'Cannot update password through this route.' });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users/login - Login user and generate JWT
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' }); // 401 Unauthorized
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed. Incorrect password.' }); // 401 Unauthorized
        }

        // If authentication is successful, create a JWT
        const token = jwt.sign(
            { userId: user._id }, // Payload containing user ID
            process.env.JWT_SECRET || 'your-secret-key', // Secret key to sign the token (store in .env)
            { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
        );

        // Return the token to the client
        res.json({ token });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;