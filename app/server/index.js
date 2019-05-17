const dotenv = require('dotenv');

const express = require('express');
const app = require('express')();
const server = require('http').Server(app);

const bodyParser = require('body-parser');
const morgan = require('morgan');

const UserModel = require('./models').UserModel;
const ProfileModel = require('./models').ProfileModel;
const LinkModel = require('./models').LinkModel;

// const {
//   getAllGroups,
//   getGroup,
//   createGroup,
//   createProposal,
//   updateProposalVote,
//   createMessage,
//   countProposalVote,
//   closeProposalVote
// } = require('./pg-controller');

// const { startIo, broadcastGroupUpdate } = require('./sockets');

// *
// load env var's
// *

if (process.env.ENV === 'production') {
  console.log('ENV: ' + process.env.ENV);
} else {
  // load local config from .env file
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
}

// stripe
require('./stripe');

// *
// db
// *

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URL_INT || 'mongodb://127.0.0.1:27017/recruiting',
  { useNewUrlParser: true }
);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// *
// Server
// *

// sockets
// startIo(server);

// configure express middleware
app.use(express.static('build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(
  morgan('dev', {
    skip: function(req, res) {
      // remove the frontend dev server's 'json' calls from the console output
      return req.originalUrl.indexOf('json') > 0;
    }
  })
);

// http routing

// get all groups
app.get('/register/profile', async function(req, res) {
  // required

  try {
    // create the user
    const user = new UserModel(req.body);
    await user.save();

    // create the profile
    const profile = new ProfileModel(req.body);
    await profile.save();

    // create a link
    const link = new LinkModel(req.body);
    await link.save();

    // check response - 404
    // if (!response) {
    //   res.status(404).send('Not Found');
    // }

    res.status(200).send(true);
  } catch (error) {
    res.status(500).send(error);
  }
});

// serve the frontend for all non-api requests
app.get('/*', function(req, res) {
  res.sendFile('index.html', { root: './build' });
});

// start server
server.listen(8080, () => {
  console.log('server listening on 8080');
});
