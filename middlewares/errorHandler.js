const ServiceError = require('../services/ServiceError');

module.exports = async (error, req, res, next) => {
    if (error) {
        if (error instanceof ServiceError) {
            const { code, message } = error;
            return res.status(code).json({ message });
        }
        return res.status(500).json({ message: 'Unexpected error occurred'});
    }
    next();
}