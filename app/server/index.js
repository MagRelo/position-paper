const dotenv = require('dotenv');

const express = require('express');
const app = require('express')();
const server = require('http').Server(app);

const bodyParser = require('body-parser');
const morgan = require('morgan');

// const getWeb3 = require('./utils/getWeb3');

const {
  getAllGroups,
  getGroup,
  createGroup,
  createProposal,
  updateProposalVote,
  createMessage,
  countProposalVote,
  closeProposalVote
} = require('./pg-controller');

const {
  startIo,
  broadcastGroupUpdate,
  getConnectedClients
} = require('./sockets');

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
}

// *
// db
// *
const { initPG } = require('./pg-controller.js');
initPG();

// *
// Server
// *

// sockets
startIo(server);

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
app.get('/group', async function(req, res) {
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

// get single group
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
  try {
    // validate params - 400
    const groupKey = req.params.contractAddress;
    const groupName = req.body.name;
    const minDeposit = req.body.minDeposit;
    const members = req.body.members;

    if (!groupKey || !groupName || !minDeposit || !members) {
      res.status(400).send('Bad Request');
    }

    const response = await createGroup(
      groupKey,
      groupName,
      minDeposit,
      members
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

// create proposal
app.post('/proposal', async function(req, res) {
  console.log('proposal:', req.body);

  try {
    // validate params - 400
    const userKey = req.body.userKey; // userKey,
    const groupKey = req.body.groupKey; // groupKey

    const fromAsset = req.body.fromAsset; //
    const toAsset = req.body.toAsset; // toAsset,
    const quantity = req.body.quantity; // quantity,

    const date = new Date();
    const created = date; // created,
    const updated = date; // updated,

    // if (!name) {
    //   res.status(400).send('Bad Request');
    // }

    const response = await createProposal(
      fromAsset,
      toAsset,
      quantity,
      created,
      updated,
      userKey,
      groupKey
    );

    // check response - 404
    // if (!response) {
    //   res.status(404).send('Not Found');
    // }

    await broadcastGroupUpdate(groupKey, userKey);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// create vote
app.post('/vote', async function(req, res) {
  console.log('vote:', req.body);

  try {
    // validate params - 400
    const userKey = req.body.userKey; // userKey,
    const groupKey = req.body.groupKey; // groupKey

    const proposalId = req.body.proposalId; //
    const inFavor = req.body.inFavor; // toAsset,

    if (!userKey || !groupKey || !proposalId) {
      return res.status(400).send('Bad Request');
    }

    // response
    const response = await updateProposalVote(
      userKey,
      groupKey,
      proposalId,
      inFavor
    );

    // check results => close vote if vote === total members
    const progress = await countProposalVote(groupKey, proposalId);
    if (progress.totalVotes === progress.totalMembers) {
      await closeProposalVote(groupKey, proposalId);
    }

    await broadcastGroupUpdate(groupKey, userKey);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// create chat
app.post('/chat', async function(req, res) {
  console.log('chat:', req.body);

  try {
    // validate params - 400
    const userKey = req.body.userKey; // userKey,
    const groupKey = req.body.groupKey; // groupKey

    const message = req.body.message; //

    if (!userKey || !groupKey || !message) {
      return res.status(400).send('Bad Request');
    }

    const response = await createMessage(userKey, groupKey, message);

    // check response - 404
    // if (!response) {
    //   res.status(404).send('Not Found');
    // }

    await broadcastGroupUpdate(groupKey, userKey);
    return res.status(200).send(response);
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
