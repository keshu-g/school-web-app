const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.jwt; 

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized by auth' });
    }

    jwt.verify(token, keys.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid token' });
        }

        req.user = user;
        next();
    });
};

const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized by req' });
    }

    next();
};

module.exports = {
    authenticateJWT,
    requireAuth
};
