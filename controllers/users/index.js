const userRegister = require('./register');
const userLogin = require('./login');
const userLogout = require('./logout');
const currentUser = require('./current');
const updateSubscription = require('./subscription');
const updateAvatar = require('./updateAvatar');

module.exports = {
    userRegister,
    userLogin,
    userLogout,
    currentUser,
    updateSubscription,
    updateAvatar,
}