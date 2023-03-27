const jwt = require('jsonwebtoken');
const { catchAsync, AppError } = require('../../utils');
const { User } = require('../../models')


const protect = catchAsync (async (req, res, next) => {
   const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1];
   if(!token) return next(new  AppError(401, 'Not authorized'));
    
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
   const currentUser = await User.findById(decoded.id);

   if(!currentUser) return next(new  AppError(401, 'Not authorized'));

   req.user = currentUser;

   next();
});

module.exports = protect;