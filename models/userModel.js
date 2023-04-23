const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ['starter', 'pro', 'business'],
        default: "starter",
      },
      avatarURL: String,
      token: {
        type: String,
        default: null,
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
      },
});

userSchema.pre('save', async function(next) {
  if(this.isNew) {
    const emailHash = crypto.createHash('md5').update(this.email).digest('hex');

    this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=retro`;
  };

  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  next();
});

userSchema.methods.checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash);


const User = mongoose.model('User', userSchema);

module.exports = User;