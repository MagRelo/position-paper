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
var router = express.Router();
const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// auth
const passport = require('passport');
require('./controllers/magic-auth');

// configure express middleware
app.use(
  express.static('build', {
    index: false,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(cookieParser());
app.set('trust proxy', true);
app.use(
  cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token'],
  })
);
app.use(passport.initialize());
app.use(
  morgan('dev', {
    skip: function (req, res) {
      // remove the frontend dev server's 'json' calls from the console output
      return req.originalUrl.indexOf('json') > 0;
    },
  })
);

// api routing
const authApi = require('./auth-api');
app.use('/auth', authApi);

// page routing
const routesApi = require('./routes');
app.use('/', routesApi);

// start server
server.listen(8080, () => {
  console.log('server listening on 8080');
});
