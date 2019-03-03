const sigUtil = require('eth-sig-util');

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

  // pass along userAddress and message
  req.userAddress = recover(authObject.message, authObject.signature);
  req.userMessage = authObject.message;

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

  // pass along userAddress and message
  packet.userAddress = recover(authObject.message, authObject.signature);
  packet.userMessage = authObject.message;

  // call next middleware function
  next();
};

function recover(message, signature) {
  // recover public key
  return sigUtil.recoverPersonalSignature({
    data: message,
    sig: signature
  });
}
