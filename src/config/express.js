const express = require('express');
const subdomain = require('express-subdomain');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const compress = require('compression');
const methodOverride = require('method-override');
const path = require('path');

const strategies = require('./passport');
const error = require('../api/v1/middlewares/error');
const {
  serverUrl,
  // websiteSubdomain,
  dashboardSubdomain,
} = require('./vars');

/**
 * Express instance
 * @public
 */
const app = express();

app.set('view engine', 'ejs');

// parse body params and attache them to req.body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.use(cors({
  origin: [
    serverUrl,
    'http://localhost:3000',
  ],
  optionsSuccessStatus: 200,
}));

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../../dashboard/build')));

app.use('/static', express.static('public'));

// mount api v1 routes
const routes = require('../api/v1/routes');

app.use('/api/v1', routes);

const dashboardRouter = express.Router();
dashboardRouter.use(
  express.static(path.join(__dirname, '../../dashboard/build')),
);
dashboardRouter.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dashboard/build/index.html'));
});
app.use(subdomain(dashboardSubdomain, dashboardRouter));

// const websiteRouter = express.Router();
// websiteRouter.use(express.static(path.join(__dirname, '../../website/build')));
// websiteRouter.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../website/build/index.html'));
// });
// app.use(subdomain(websiteSubdomain, websiteRouter));

// if error is not an instanceOf APIError, convert it.
// app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
