// *
// monitoring
// *
require('newrelic');

// *
// load env var's
// *
const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
  // load local config from .env file
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
}
console.log('ENV: ' + process.env.NODE_ENV);

// *
// db
// *

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL_INT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});
// require('./utils/seedDb');

// *
// Server
// *

const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// auth
const session = require('express-session');
const passport = require('passport');

// configure express middleware
app.set('trust proxy', true);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  morgan('dev', {
    skip: function (req, res) {
      // remove the frontend dev server's 'json' calls from the console output
      return req.originalUrl.indexOf('json') > 0;
    },
  })
);
app.use(
  express.static('build', {
    index: false,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'sesh-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour
      // secure: process.env.COOKIES_SECURE,
      // sameSite: process.env.COOKIES_SAMESITE,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// api routing
require('./controllers/magic-auth');
const authApi = require('./auth-api');
app.use('/auth', authApi);

// page routing
const routesApi = require('./routes');
app.use('/', routesApi);

// start server
server.listen(8080, () => {
  console.log('server listening on 8080');
});
