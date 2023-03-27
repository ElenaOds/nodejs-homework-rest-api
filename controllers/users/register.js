const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { catchAsync } = require('../../utils');
const { User } = require('../../models');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

const userRegister = catchAsync(async (req, res) => {
  const newUserData = {
    ...req.body,
  };

  const newUser = await User.create(newUserData);
  newUser.password = undefined;
    
  const token = signToken(newUser.id);

  res.status(201).json({
      user: newUser,
      token, 
    });
  });

module.exports = userRegister;