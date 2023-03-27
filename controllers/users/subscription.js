const { catchAsync } = require('../../utils');
const { User } = require('../../models');

const updateSubscription = catchAsync (async (req, res) => {
const user = await User.findById(req.user.id);

if(user) {
    user.subscription = req.body.subscription;
};

const updatedUser = await user.save();
res.status(200).json({
    updatedUser,
        });
  });

  module.exports = updateSubscription;

