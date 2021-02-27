const Validator = require('../utils/Validator');
const ValidationError = require('../errors/ValidationError');

module.exports = (template) => async (req, res, next) => {
    const { body } = req;
    let result = Validator.validate(body, template);
    let keys = Object.keys(result);
    if (keys.length > 0) {
        return next(new ValidationError({
            fields: keys,
            message: result[keys[0]].message,
            code: 400
        }));
    }
    return next();
}