const Queue = require('bull');
const workerTasks = require('../utils/workerTasks');

const { redisUrl } = require('../../../config/vars');

// Create / Connect to a named work queue
const workQueue = new Queue('work', redisUrl);

const mediaCreated = async (media) => {
  try {
    await workQueue.add({
      task: workerTasks.MEDIA_CREATED,
      mediaId: media._id,
    });
  } catch (error) {
    //
  }
};

module.exports = {
  mediaCreated,
};
