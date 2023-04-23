const { catchAsync, AppError } = require('../../utils');
const { User } = require('../../models');

const verification = catchAsync (async (req, res, next) => {

    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
  
    if(!user) return next(new AppError(404, 'User not found'));


    await User.findByIdAndUpdate(user.id, {verify: true, verificationToken: ''});

    res.status(200).json({
        message: 'Verification successful',
      });
    });
    
    module.exports = verification;

