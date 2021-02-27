const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const RefreshTokenModel = require('../Models/RefreshToken');
const UserModel = require('../Models/User');
const ServiceError = require('../errors/ServiceError');
const ValidationError = require('../errors/ValidationError');
const { jwtSecret, jwtConfig } = require('../config.json');

class AuthService {

    register = async (username, email, password) => {

        const isUsernameExists = await User.exists({ 
            username: { 
                $regex: new RegExp(username, 'i') 
            } 
        });
        if (isUsernameExists) {
            throw new ValidationError({
                message: 'Username should be unique',
                fields: ['username'],
                code: 401
            });
        }

        const isEmailExists = await User.exists({ 
            email: email.toLowerCase() 
        });
        if (isEmailExists) {
            throw new ValidationError({
                message: 'Email should be unique',
                fields: ['email'],
                code: 401
            });
        }
        const hash = await bcrypt.hash(password, 10);
        const user = new UserModel({ username, email, password: hash });
        return user.save();
    }

    login = async (email, password) => {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new ServiceError({
                message: 'Invalid username or password',
                code: 404
            })
        }
    
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
        if (!isPasswordCorrect) {
            throw new ServiceError({
                message: 'Invalid username or password',
                code: 404
            })
        }

        const token = jwt.sign(
            { id: user._id },
            jwtSecret,
            jwtConfig
        );
        
        const refreshToken = new RefreshTokenModel({ owner: user._id });
        await refreshToken.save();

        return {
            token,
            refreshToken
        }
    }

    refreshToken = async (accessToken, refreshToken) => {
        const { id } = jwt.decode(accessToken, {}, jwtSecret);
        const isFoundToken = await RefreshTokenModel.deleteOne({ _id: refreshToken, owner: id });
    
        if (isFoundToken.deletedCount === 0) {
            await RefreshTokenModel.deleteMany({ owner: id });
            return res.status(404).json({ message: 'Invalid refresh token' });
        }
    
        const newRefreshToken = new RefreshTokenModel({ owner: id });
        await newRefreshToken.save();
    
        const token = jwt.sign(
            { id },
            jwtSecret,
            jwtConfig
        );

        return {
            token,
            refreshToken: new RefreshToken
        }
    }

}


module.exports = AuthService;