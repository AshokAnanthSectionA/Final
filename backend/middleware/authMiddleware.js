const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); 

const auth = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID in the token payload
        const user = await User.findOne({ _id: decoded.userId });

        if (!user) {
            throw new Error();
        }

        // Attach the user object to the request for route handlers to use
        req.user = user;
        req.token = token;

        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        res.status(401).send({ error: 'Authentication failed.' }); // 401 Unauthorized
    }
};

module.exports = auth;