import express from 'express';
import passport from 'passport';
import cors from 'cors';
import * as path from 'path';

import routes from '../api/v1/routes';
import { jwtStrategy } from './passport';

const error = require('../api/v1/middlewares/error');

/**
 * Express instance
 * @public
 */
const app = express();

app.use(cors);
app.set('view engine', 'ejs');

// parse body params and attache them to req.body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// enable authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../../dashboard/build')));

app.use('/static', express.static('public'));

app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.converter);
app.use(error.handler);

export default app;
