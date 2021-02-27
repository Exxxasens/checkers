const AuthService = require('../../services/AuthService');
const service = new AuthService();

module.exports = async (req, res, next) => {
    const { body } = req;
    const { refreshToken, token } = body;
    try {
        const tokenPair = await service.refreshToken(token, refreshToken);
        return res.json(tokenPair);
    } catch (error) {
        next(error);
    }
}