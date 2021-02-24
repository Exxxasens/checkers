const Validator = require('../libs/Validator');

module.exports = (template) => async (req, res, next) => {
    const { body } = req;
    let result = Validator.validate(body, template);
    let keys = Object.keys(result);
    if (keys.length > 0) {
        return next({
            fields: keys,
            error: result
        });
    }
    return next();
}