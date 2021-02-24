const bcrypt = require('bcrypt');
const User = require('../../Models/User');
const RefreshToken = require('../../Models/RefreshToken');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtConfig } = require('../../config.json');

module.exports = async (req, res) => {
    const { body } = req;
    const { password, email } = body;

    const sendError = () => {
        res.status(404).json({ message: 'Invalid username or password' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return sendError();
        }
    
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
        if (!isPasswordCorrect) {
            return sendError();
        }

        const token = jwt.sign(
            { id: user._id },
            jwtSecret,
            jwtConfig
        );
        
        const refreshToken = new RefreshToken({ owner: user._id });
        await refreshToken.save();
        
        res.status(200).json({ token, refreshToken: refreshToken._id });

    } catch (error) {
        res.status(500).json({ message: 'Unexpected error occurred' });
        console.log(error);
    }
    
}