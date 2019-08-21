const expressJwt = require('express-jwt');

const UserModel = require('../models').UserModel;

//
// MIDDLEWARE
//
exports.getToken = expressJwt({
  secret: process.env['JWT_SECRET'],
  getToken: function(req) {
    if (req.headers['servesa-auth-token']) {
      return req.headers['servesa-auth-token'];
    }
    if (req.cookies['servesa-auth-token']) {
      return req.cookies['servesa-auth-token'];
    }
    return null;
  },
  credentialsRequired: false
});

exports.authenticate = function(req, res, next) {
  if (req.user && !req.user.id) {
    console.log('getUser - no user id');
    return res.status(401).send({ error: 'getUser - no user id' });
  }
  next();
};

exports.getUser = async function(req, res, next) {
  if (req.user && req.user.id) {
    const user = await UserModel.findOne({ _id: req.user.id }).lean();
    req.user = { ...user, ...req.user };
  }
  next();
};
