const router = require('express').Router();
const Validator = require('../../libs/Validator');
const validate = require('../../middlewares/validate');

const email = Validator.Email().required();
const password = Validator.String().required().min(6).max(64);
const username = Validator.String().required().min(4).max(64);

const registerHandler = require('./register');
const registerTemplate = {
    email,
    password,
    username
}
router.post('/register', [validate(registerTemplate)], registerHandler);

const loginHandler = require('./login');
const loginTemplate = {
    email,
    password
}
router.post('/login', [validate(loginTemplate)], loginHandler);

module.exports = router;