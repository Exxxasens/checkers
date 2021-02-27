const User = require('../../Models/User');
const AuthService = require('../../services/AuthService');
const service = new AuthService();

module.exports = async (req, res, next) => {
    const { body } = req;
    const { email, username, password } = body;

    try {

        if (await User.exists({ username })) {
            return res.status(401).json({ error: true, fields: ['username'], message: 'Username should be unique' });
        }
    
        if (await User.exists({ email })) {
            return res.status(401).json({ error: true, fields: ['email'], message: 'Email should be unique' });
        }

        await service.register(username, email, password);

        res.status(200).json({ message: 'User registered successfully' });

    } catch (error) {
        next(error);
    }

}