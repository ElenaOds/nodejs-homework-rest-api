const jwt = require('jsonwebtoken');
const { catchAsync, AppError } = require('../../utils');
const { User } = require('../../models');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

const userLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
   
    if(!password) return next(new AppError(401, 'Email or password is wrong'));
    
    const user = await User.findOne({ email }).select('+password');

    if(!user) return next(new AppError(401, 'Email or password is wrong'));

    const passwordIsValid = await user.checkPassword(password, user.password);

    if(!passwordIsValid) return next(new AppError(401, 'Email or password is wrong'));

    if(!user.verify) return next(new AppError(401, 'Email is not verified'));

    user.password = undefined;
    const token = signToken(user.id);

  res.status(200).json({
    user, 
    token,
    });
});

module.exports = userLogin;
