const multer = require('multer');
const uuid = require('uuid').v4;
const path = require('path');
const fse = require('fs-extra');
const Jimp = require('jimp');

const { AppError } = require('../utils');


const uploadDir = path.join(process.cwd(), 'temp');
const avatarsDir = path.join(process.cwd(), 'public', 'avatars');

class ImageService {
  static upload(name) {
    const multerStorage = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, uploadDir);
      },
      filename: (req, file, callbackFn) => {
        callbackFn(null, file.originalname);
      },
    });

    const multerFilter = (req, file, callbackFn) => {
        if (file.mimetype.startsWith('image')) {
            callbackFn(null, true);
        } else {
            callbackFn(new AppError(400, 'Upload images only..'), false);
        };
    };

    return multer({
      storage: multerStorage,
      filterFile: multerFilter,
    }).single(name);
  }

  static async save(id, file, options) {
    const ext = file.mimetype.split('/')[1];
    const originalName = file.originalname;
    const fileName = `${id}-${uuid()}.${ext}`;

    await fse.ensureDir(avatarsDir);

    const avatars = await fse.readdir(avatarsDir);
    if (avatars) {
      avatars.forEach((avatar) => {
        if (avatar.startsWith(id)) fse.remove(path.join(avatarsDir, avatar));
      });
    }

    const image = await Jimp.read(path.join(uploadDir, originalName));

    image
      .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_TOP)
      .quality(90)
      .writeAsync(path.join(avatarsDir, fileName));

    await fse.remove(path.join(uploadDir, originalName));

    return path.join('avatars', fileName);
  }
}

module.exports = ImageService;