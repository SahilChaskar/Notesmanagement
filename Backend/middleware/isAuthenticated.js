const jwt = require('jsonwebtoken');
// require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'kL9zG0t3Jf1vM8bXyQ4eA2wN5cR6hP7';

function isAuthenticated(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ error: 'Unauthorized' });
    }
}

module.exports = isAuthenticated;
