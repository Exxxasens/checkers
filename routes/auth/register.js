const AuthService = require('../../services/AuthService');
const service = new AuthService();

module.exports = async (req, res, next) => {
    const { body } = req;
    const { email, username, password } = body;

    try {
        await service.register(username, email.toLowerCase(), password);
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }

}