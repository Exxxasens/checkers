const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config.json');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader.split(' ')[1];
    
    if (!accessToken) {
        return res.status(404).json({ message: 'Access token is required' });
    }

    jwt.verify(accessToken, jwtSecret, (err, user) => {
        if (err) {
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: 'Token expired' });
            }
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.session = user;
        next();
    });
}   