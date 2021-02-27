const AuthService = require('../../services/AuthService');
const service = new AuthService();

module.exports = async (req, res, next) => {
    const { body } = req;
    const { password, email } = body;

    try {
        const { token, refreshToken } = await service.login(email, password);
        res.status(200).json({ token, refreshToken: refreshToken._id });
    } catch (error) {
        next(error);
    }
    
}