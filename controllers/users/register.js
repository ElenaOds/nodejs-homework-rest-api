const jwt = require('jsonwebtoken');
const { catchAsync } = require('../../utils');
const { User } = require('../../models');
const uuid = require('uuid').v4;
const { sendEmail } = require('../../services');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

const userRegister = catchAsync(async (req, res) => {
  const { email, password, subscription } = req.body;

  const verificationToken = uuid();
  
  const newUserData = {
    email, 
    password, 
    subscription,
    verificationToken,
  };

  const newUser = await User.create(newUserData);
  newUser.password = undefined;
    
  const token = signToken(newUser.id);

  const verifyEmail = {
    to: email,
    subject: 'Email verification',
    html: `<a target='_blank' href='${process.env.BASE_URL}/users/verify/${verificationToken}'>Please folllow the link to confirm your email</a>`
};

await sendEmail(verifyEmail);

  res.status(201).json({
      user: newUser,
      token, 
    });
  });

module.exports = userRegister;