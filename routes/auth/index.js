const router = require('express').Router();
const Validator = require('../../utils/Validator');
const validate = require('../../middlewares/validate');

const email = Validator.Email().required();
const password = Validator.String().required().min(6).max(64);
const username = Validator.String().required().min(4).max(64);

router.post(
    '/register',
    [
        validate({
            email,
            password,
            username
        })
    ],
    require('./register'));

router.post(
    '/login', 
    [
        validate({
            email,
            password
        })
    ], 
    require('./login'));

router.post(
    '/refresh', 
    [
        validate({    
            refreshToken: Validator.String().required(),
            token: Validator.String().required()
        })
    ], 
    require('./refresh')
);

module.exports = router;