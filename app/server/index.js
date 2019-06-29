// *
// load env var's
// *
const dotenv = require('dotenv');
if (process.env.ENV === 'production') {
  console.log('ENV: ' + process.env.ENV);
} else {
  // load local config from .env file
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
}

const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const passport = require('passport');
require('./auth/local');

// all routes
const httpApi = require('./api');

// require('./utils/seedDb');

// *
// db
// *

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URL_INT || 'mongodb://127.0.0.1:27017/referral',
  { useNewUrlParser: true }
);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// *
// Server
// *

// load stripe api
// require('./integrations/stripe');

// configure express middleware
app.use(express.static('build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '1mb' }));
app.set('trust proxy', true);
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'pasta',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: true,
    name: 'servesa',
    cookie: {
      path: '/',
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 14
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  morgan('dev', {
    skip: function(req, res) {
      // remove the frontend dev server's 'json' calls from the console output
      return req.originalUrl.indexOf('json') > 0;
    }
  })
);

// add http routing
app.use('/api', httpApi);

// serve the frontend for all non-api requests
app.get('/*', function(req, res) {
  res.sendFile('index.html', { root: './build' });
});

// start server
server.listen(8080, () => {
  console.log('server listening on 8080');
});
