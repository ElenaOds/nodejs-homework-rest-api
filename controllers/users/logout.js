const { catchAsync } = require('../../utils');
const { User } = require('../../models');


const userLogout = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { token: null });
   
    res.status(204).json();
});

module.exports = userLogout;