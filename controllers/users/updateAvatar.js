const { catchAsync } = require('../../utils');
const { ImageService } = require('../../services');

const updateAvatar = catchAsync (async (req, res) => {

const { file, user } = req;

if(file) {
  user.avatar = await ImageService.save(user.id, file, { width: 250, height: 250});
}

const {avatarURL} = await user.save();

res.status(200).json({
    avatarURL,
  });
});

module.exports = updateAvatar;
