class ValidationError extends Error {
    constructor({ fields = [], message, code = 500 }) {
        super(message);
        this.fields = fields;
        this.message = message;
        this.code = code;
    }
}

module.exports = ValidationError;