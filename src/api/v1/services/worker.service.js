const sharp = require('sharp');
const axios = require('axios').default;

const Media = require('../models/media.model');
const awsService = require('./aws.service');

// const createThumbnail = async () => {};

const resizeMedia = async (job) => {
  try {
    const { mediaId } = job.data;
    const media = await Media.findById(mediaId);
    const originalFileResponse = await axios.get(media.originalUrl, {
      responseType: 'arraybuffer',
    });
    job.progress(20);
    const fileName = originalFileResponse.request.path.replace('/full/', '');
    const thumbnailSizeImage = await awsService.uploadFileToAWSS3(
      `thumbnail/${fileName}`,
      originalFileResponse.headers['content-type'],
      await sharp(originalFileResponse.data).resize(300).toBuffer(),
    );
    job.progress(40);
    const mediumSizeImage = await awsService.uploadFileToAWSS3(
      `medium/${fileName}`,
      originalFileResponse.headers['content-type'],
      await sharp(originalFileResponse.data).resize(750).toBuffer(),
    );
    job.progress(60);
    const largeSizeImage = await awsService.uploadFileToAWSS3(
      `large/${fileName}`,
      originalFileResponse.headers['content-type'],
      await sharp(originalFileResponse.data).resize(1500).toBuffer(),
    );
    job.progress(80);
    const updatedMedia = await Media.findByIdAndUpdate(
      media._id,
      {
        thumbnailUrl: thumbnailSizeImage.Location,
        mediumUrl: mediumSizeImage.Location,
        largeUrl: largeSizeImage.Location,
      },
      { new: true },
    );
    job.progress(100);
    return updatedMedia;
  } catch (error) {
    return { success: false, error };
  }
};

module.exports = {
  resizeMedia,
};
