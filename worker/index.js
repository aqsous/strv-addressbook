// eslint-disable-next-line no-global-assign
Promise = require('bluebird');
const throng = require('throng');
const Queue = require('bull');

const workerTasks = require('../src/api/v1/utils/workerTasks');
const workerService = require('../src/api/v1/services/worker.service');
const mongoose = require('../src/config/mongoose');
const { redisUrl } = require('../src/config/vars');

// open mongoose connection
mongoose.connect();

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
const workers = process.env.WEB_CONCURRENCY || 2;

// The maxium number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
const maxJobsPerWorker = 1;

function start() {
  // Connect to the named work queue
  const workQueue = new Queue('work', redisUrl);

  workQueue.process(maxJobsPerWorker, async (job) => {
    try {
      // This is an example job that just slowly reports on progress
      // while doing no work. Replace this with your own job logic.
      if (job.data != null && job.data.task === workerTasks.MEDIA_CREATED) {
        return await workerService.resizeMedia(job);
      }
    } catch (error) {
      return { success: false, error };
    }
    job.progress(100);
    // A job can return values that will be stored in Redis as JSON
    // This return value is unused in this demo application.
    return { value: 'This will be stored' };
  });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });
