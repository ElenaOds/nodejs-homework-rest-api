const { catchAsync, AppError } = require('../../utils');
const { User } = require('../../models');
const { sendEmail } = require('../../services');

const sendVerifyEmail = catchAsync (async (req, res, next) => {

    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) return next(new AppError(400, 'Missing required field email'));
    if(user.verify) return next(new AppError(400, 'Verification has already been passed'));

    const verifyEmail = {
        to: email,
        subject: 'Email verification',
        html: `<a target='_blank' href='${process.env.BASE_URL}/users/verify/${user.verificationToken}'>Please folllow the link to confirm your email</a>`
    };
    await sendEmail(verifyEmail);

    res.status(200).json({
        message: 'Verification email sent',
      });
    });
    
    module.exports = sendVerifyEmail;
