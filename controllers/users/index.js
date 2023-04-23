const userRegister = require('./register');
const userLogin = require('./login');
const userLogout = require('./logout');
const currentUser = require('./current');
const updateSubscription = require('./subscription');
const updateAvatar = require('./updateAvatar');
const verification = require('./verification');
const sendVerifyEmail = require('./sendVerifyEmail');

module.exports = {
    userRegister,
    userLogin,
    userLogout,
    currentUser,
    updateSubscription,
    updateAvatar,
    verification,
    sendVerifyEmail,
}