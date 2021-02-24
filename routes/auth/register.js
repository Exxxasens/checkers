const bcrypt = require('bcrypt');
const User = require('../../Models/User');

module.exports = async (req, res) => {
    const { body } = req;
    const { email, username, password } = body;

    try {
        const isFoundUsername = await User.exists({ username });
        if (isFoundUsername) {
            return res.status(401).json({ error: true, fields: ['username'], message: 'username should be unique' });
        }

        const isFoundEmail = await User.exists({ email });
        if (isFoundEmail) {
            return res.status(401).json({ error: true, fields: ['email'], message: 'email should be unique' });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hash });
        await user.save();

        res.status(200).json({ error: false, message: 'user registered successfully' });

    } catch (error) {
        next(error);
    }

}