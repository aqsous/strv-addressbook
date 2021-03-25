const awsService = require('../services/aws.service');

exports.uploadImage = async (req, res, next) => {
  try {
    const fileName = `${Math.floor(Math.random() * 999)}_${Date.now()}_${req.file.originalname.split(' ').join('_')}`;
    const fileType = req.file.mimetype;
    // const smallSizeImage = await uploadFileToAWSS3(
    //   `small/${fileName}`, fileType,
    //   await sharp(req.file.buffer).resize(200, 200).toBuffer(),
    // );
    const fullSizeImage = await awsService.uploadFileToAWSS3(`full/${fileName}`, fileType, req.file.buffer);
    res.json(fullSizeImage);
  } catch (error) {
    next(error);
  }
};

exports.uploadImages = async (req, res, next) => {
  try {
    const uploadedFile = [];
    for (let index = 0; index < req.files.length; index += 1) {
      const file = req.files[index];
      const fileName = `${Math.floor(Math.random() * 999)}_${Date.now()}_${file.originalname.split(' ').join('_')}`;
      const fileType = file.mimetype;
      // const smallSizeImage = await uploadFileToAWSS3(
      //   `small/${fileName}`, fileType,
      //   await sharp(req.file.buffer).resize(200, 200).toBuffer(),
      // );
      // eslint-disable-next-line no-await-in-loop
      const fullSizeImage = await awsService.uploadFileToAWSS3(`full/${fileName}`, fileType, file.buffer);
      uploadedFile.push(fullSizeImage);
    }
    res.json(uploadedFile);
  } catch (error) {
    next(error);
  }
};
