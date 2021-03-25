// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port } = require('./config/vars');

const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

const app = require('./config/express');

app.listen(port, () => console.log(`listening on http://localhost:${port}`));

/**
* Exports express
* @public
*/
module.exports = app;
