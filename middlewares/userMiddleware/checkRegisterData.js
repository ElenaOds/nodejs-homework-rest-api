const { AppError, catchAsync, userValidator} = require('../../utils');
const { User } = require('../../models');

const checkRegisterData = catchAsync (async (req, res, next) => {
    const { error, value } = userValidator.createUserValidator(req.body);

    if (error) return next(new AppError(400, error.details.map(item => item.message)));

    const emailExists = await User.exists({ email: value.email });
    if(emailExists) return next(new AppError(409, 'Email in use'));

    req.body = value;
    
      next();
});

module.exports = checkRegisterData;