const sigUtil = require('eth-sig-util');

const { checkUserMembership } = require('./pg-controller');

function recover(message, signature) {
  return sigUtil.recoverPersonalSignature({
    data: message,
    sig: signature
  });
}

exports.expressAuth = async function(req, res, next) {
  // check for header
  if (!req.headers['x-servesa']) {
    return res.status(401).send('Unauthorized');
  }

  // parse header object
  const authObject = JSON.parse(req.headers['x-servesa']);
  if (!authObject.message || !authObject.signature) {
    return res.status(401).send('Unauthorized');
  }

  // validate that user can access group key(?)
  const recoveredUserKey = recover(authObject.message, authObject.signature);

  // check of user can access group

  // call next middleware function
  next();
};

exports.socketAuth = async function(packet, next) {
  // check for header
  if (!packet.handshake.headers['x-servesa']) {
    console.log('no header');
    return next(new Error('401'));
  }

  // parse header object
  const authObject = JSON.parse(packet.handshake.headers['x-servesa']);
  if (!authObject.message || !authObject.signature) {
    console.log('no auth content');
    return next(new Error('401'));
  }

  // validate that user can access group key(?)
  const recoveredUserKey = recover(authObject.message, authObject.signature);
  const groupKey = packet.handshake.query.groupKey;

  const isMember = await checkUserMembership(recoveredUserKey, groupKey);

  if (!isMember) {
    console.log('member not found in group');
    return next(new Error('401'));
  }
  // call next middleware function
  next();
};
