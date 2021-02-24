const RefreshToken = require('../../Models/RefreshToken');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtConfig } = require('../../config.json');

module.exports = async (req, res) => {
    const { body } = req;
    const { refreshToken } = body;
    const { id } = req.session;
    try {
        const isFoundToken = await RefreshToken.deleteOne({ _id: refreshToken });
    
        if (isFoundToken.deletedCount === 0) {
            await RefreshToken.deleteMany({ owner: id });
            return res.status(404).json({ message: 'Invalid refresh token' });
        }
    
        const newRefreshToken = new RefreshToken({ owner: id });
        await newRefreshToken.save();
    
        const accessToken = jwt.sign(
            { id },
            jwtSecret,
            jwtConfig
        );
    
        return res.json({ refreshToken: newRefreshToken._id, token: accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Unexpected error occurred' });
        console.log(error);
    }
    
}