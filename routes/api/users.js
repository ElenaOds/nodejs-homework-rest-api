const { Router } = require('express');

const { users: ctrl } = require('../../controllers');
const { userMiddleware: mdlwr } = require('../../middlewares');

const router = Router();

router.post('/register', mdlwr.checkRegisterData, ctrl.userRegister);
router.post('/login', ctrl.userLogin);
router.post('/logout', mdlwr.protect, ctrl.userLogout);
router.post('/current', mdlwr.protect, ctrl.currentUser);
router.patch('/', mdlwr.protect, ctrl.updateSubscription);

module.exports = router;