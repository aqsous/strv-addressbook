/* eslint-disable import/no-dynamic-require */
const fs = require('fs');

const models = {};
fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    // eslint-disable-next-line global-require
    const model = require(`./${file}`);
    models[model.modelName] = model;
  });

module.exports = models;
