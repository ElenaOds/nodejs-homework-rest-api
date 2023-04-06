const Joi = require('joi');

const PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

exports.createUserValidator = (data) => Joi.object()
.options({ abortEarly: false })
.keys({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().regex(PASSWD_REGEX).required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
}).validate(data);

