const ServiceError = require('../errors/ServiceError');
const ValidationError = require('../errors/ValidationError');

module.exports = async (error, req, res, next) => {
    if (error) {
        if (error instanceof ServiceError) {
            const { code, message } = error;
            return res.status(code).json({ message });
        }

        if (error instanceof ValidationError) {
            const { code, message, fields } = error;
            return res.status(code).json({ message, fields });
        }

        return res.status(500).json({ message: 'Unexpected error occurred'});
    }
    next();
}