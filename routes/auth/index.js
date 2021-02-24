const router = require('express').Router();
const Validator = require('../../libs/Validator');
const validateMiddlware = require('../../middlewares/validate');

const registerHandler = require('./register');
const registerTemplate = {
    email: Validator.Email().required(),
    password: Validator.String().required().min(6).max(64),
    username: Validator.String().required().min(4).max(64)
}
router.post('/register', [validateMiddlware(registerTemplate)], registerHandler);

module.exports = router;