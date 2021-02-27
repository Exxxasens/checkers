class Validator {
    static validate(obj = {}, template) {
        const result = {};
        for (let key in template) {
            if (obj.hasOwnProperty(key)) {
                for (let middleware of template[key]._list) {
                    const r = middleware(obj[key]);
                    if (r.error) {
                        result[key] = r;
                        break;
                    }
                }
            }

            if (!obj.hasOwnProperty(key) && template[key]._required || !obj[key] && template[key]._required) {
                result[key] = {
                    error: true,
                    message: `${key} is required`
                }
            }

        }
        return result;
    }

    static String() {
        return {
            _required: false,
            _list: [(value) => {
                if (value && typeof (value) !== 'string') {
                    return {
                        error: true,
                        message: 'Type string is required'
                    }
                }
                return {
                    error: false,
                    message: null
                }
            }],
            min(int) {
                this._list.push(function (value) {
                    if (value.length < int) {
                        return {
                            error: true,
                            message: `String length is less then ${int}`
                        }
                    }
                    return {
                        error: false,
                        message: null
                    }
                });
                return this;
            },
            max(int) {
                this._list.push(function (value) {
                    if (value.length > int) {
                        return {
                            error: true,
                            message: `String length is less more than ${int}`
                        }
                    }
                    return {
                        error: false,
                        message: null
                    }
                });
                return this;
            },
            required() {
                this._required = true;
                return this;
            }
        }
    }

    static Number() {
        return {
            _required: false,
            _list: [(value) => {
                if (value && typeof (value) !== 'number') {
                    return {
                        error: true,
                        message: 'Type number is required'
                    }
                }
                return {
                    error: false,
                    message: null
                }
            }],
            min(int) {
                this._list.push(function (value) {
                    if (value < int) {
                        return {
                            error: true,
                            message: `Value is less than ${int}`
                        }
                    }
                    return {
                        error: false,
                        message: null
                    }
                });
                return this;
            },
            max(int) {
                this._list.push(function (value) {
                    if (value > int) {
                        return {
                            error: true,
                            message: `Value is more then ${int}`
                        }
                    }
                    return {
                        error: false,
                        message: null
                    }
                });
                return this;
            },
            required() {
                this._required = true;
                return this;
            }
        }
    }

    static Email() {
        return {
            _required: false,
            _list: [function(value) {
                const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (regex.test(value)) {
                    return {
                        error: false,
                        message: null
                    }
                }
                return {
                    error: true,
                    message: 'Invalid email'
                }
            }],
            required() {
                this._required = true;
                return this;
            }
        }
    }
}

module.exports = Validator;