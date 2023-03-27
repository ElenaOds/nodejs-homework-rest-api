const { catchAsync } = require('../../utils');

const currentUser = catchAsync(async (req, res) => {
    const { email, subscription } = req.user;

    res.status(200).json({
        user: {
            email,
            subscription
        },
    });
});

module.exports = currentUser;