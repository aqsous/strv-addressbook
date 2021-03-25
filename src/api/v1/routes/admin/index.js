/* eslint-disable import/no-dynamic-require */
const express = require('express');
const fs = require('fs');

const router = express.Router();

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    if (fs.lstatSync(`${__dirname}/${file}`).isDirectory()) {
      if (fs.existsSync(`${__dirname}/${file}/index.js`)) {
        // eslint-disable-next-line global-require
        router.use(`/${file}`, require(`./${file}`));
      }
    } else if (fs.lstatSync(`${__dirname}/${file}`).isFile()) {
      if (file.endsWith(('.route.js'))) {
        const routerPath = file.replace('.route.js', '');
        // eslint-disable-next-line global-require
        router.use(`/${routerPath}`, require(`./${routerPath}.route`));
      }
    }
  });

module.exports = router;
