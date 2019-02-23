const dotenv = require('dotenv');

const express = require('express');
const app = require('express')();
const server = require('http').Server(app);

const bodyParser = require('body-parser');
const morgan = require('morgan');

// const getWeb3 = require('./utils/getWeb3');

const { getAllGroups, getGroup, createGroup } = require('./pg-controller');

const sigUtil = require('eth-sig-util');
// const ethUtil = require('ethereumjs-util');

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
  console.log(result.parsed);
}

// *
// db
// *
const { initPG } = require('./pg-controller.js');
initPG();

// *
// Server
// *

// sockets routing
let io = require('./sockets')(server);

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

// all groups
app.get('/group/', async function(req, res) {
  try {
    const response = await getAllGroups();

    // check response - 404
    if (!response) {
      res.status(404).send('Not Found');
    }

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

// single group
app.get('/group/:contractAddress', async function(req, res) {
  try {
    // auth - 403
    // TODO check user is in group
    // res.status(403).send('Unauthorized');

    // validate params - 400
    const contractAddress = req.params.contractAddress;
    if (!contractAddress) {
      res.status(400).send('Bad Request');
    }

    const response = await getGroup(contractAddress);

    // check response - 404
    if (!response) {
      res.status(404).send('Not Found');
    }

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

// create group
app.post('/group/:contractAddress', async function(req, res) {
  console.log('body:', req.body);

  try {
    // validate params - 400
    const name = req.body.name;
    const minDeposit = req.body.minDeposit;
    const members = req.body.members;
    const contractAddress = req.params.contractAddress;

    if (!name || !minDeposit || !contractAddress || !members) {
      res.status(400).send('Bad Request');
    }

    const response = await createGroup(
      name,
      minDeposit,
      members,
      contractAddress
    );

    // check response - 404
    // if (!response) {
    //   res.status(404).send('Not Found');
    // }

    res.status(200).send(response);
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

// *
// helpers
// *

function signatureAuth(req, res, next) {
  // check for header
  if (!req.headers['x-servesa']) {
    return res.status(401).send('Unauthorized');
  }

  // parse header object
  const authObject = JSON.parse(req.headers['x-servesa']);
  if (!authObject.message || !authObject.signature) {
    return res.status(401).send('Unauthorized');
  }

  // pass along userAddress and message
  req.userAddress = recover(authObject.message, authObject.signature);
  req.userMessage = authObject.message;

  // call next middleware function
  next();
}

function recover(message, signature) {
  // recover public key
  return sigUtil.recoverPersonalSignature({
    data: message,
    sig: signature
  });
}
