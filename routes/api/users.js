const { Router } = require('express');

const { users: ctrl } = require('../../controllers');
const { userMiddleware: mdlwr } = require('../../middlewares');

const router = Router();

router.post('/register', mdlwr.checkRegisterData, ctrl.userRegister);
router.post('/login', ctrl.userLogin);
router.post('/logout', mdlwr.protect, ctrl.userLogout);
router.get('/current', mdlwr.protect, ctrl.currentUser);
router.patch('/', mdlwr.protect, ctrl.updateSubscription);
router.patch('/avatars', mdlwr.protect, mdlwr.checkAvatar, ctrl.updateAvatar);

module.exports = router;