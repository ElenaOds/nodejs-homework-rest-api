const { ImageService } = require('../../services');


const checkAvatar = ImageService.upload('avatar');

module.exports = checkAvatar;