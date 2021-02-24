const { Schema, model, SchemaTypes } = require('mongoose');

const refreshTokenSchema = new Schema({
    owner: {
        type: SchemaTypes.ObjectId
    }
}, { autoIndex: true, timestamps: true });

module.exports = model('refresh_token', refreshTokenSchema);