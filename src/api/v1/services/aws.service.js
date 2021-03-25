const AWS = require('aws-sdk');

/**
 * AWS
 * user in console: we-skillz-api
 */

// Enter copied or downloaded access ID and secret key here
const AWS_ACCESS_ID = 'AKIAVOWBZWLYU3F5WCX6';
const AWS_SECRET_KEY = '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';
// The name of the bucket that you have created
const S3_BUCKET_NAME = 'we-skillz-api';

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_ID,
  secretAccessKey: AWS_SECRET_KEY,
});

const uploadFileToAWSS3 = (fileName, fileType, fileContent) => new Promise((resolve, reject) => {
  // Setting up S3 upload parameters
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: fileName, // File name you want to save as in S3
    ContentType: fileType,
    Body: fileContent,
    ACL: 'public-read',
  };

  // Uploading files to the bucket
  s3.upload(params, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

module.exports = {
  uploadFileToAWSS3,
};
