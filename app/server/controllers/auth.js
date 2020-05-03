const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const UserModel = require('../models').UserModel;

//
// MIDDLEWARE
//
exports.getToken = expressJwt({
  secret: process.env['JWT_SECRET'],
  getToken: function (req) {
    if (req.headers['servesa-auth-token']) {
      return req.headers['servesa-auth-token'];
    }
    if (req.cookies['servesa-auth-token']) {
      return req.cookies['servesa-auth-token'];
    }
    return null;
  },
  credentialsRequired: false,
});

exports.authenticate = function (req, res, next) {
  if (!req.user || !req.user.id) {
    console.log('getUser - no user id');
    return res.status(401).send({ error: 'getUser - no user id' });
  }
  next();
};

exports.getUser = async function (req, res, next) {
  if (req.user && req.user.id) {
    const user = await UserModel.findOne({ _id: req.user.id })
      .select(
        'type status displayName avatar address description location radius'
      )
      .lean();

    req.user = { ...user, ...req.user };
  }
  next();
};

exports.sendToken = function (req, res) {
  if (!req.user) {
    // console.log('Send Token: user:', req.user);
    return res.status(401).send('User Not Authenticated');
  }

  // create token
  const token = jwt.sign(
    {
      id: req.user._id,
    },
    process.env['JWT_SECRET'],
    {
      expiresIn: 60 * 120,
    }
  );

  return res.status(200).send({ token, ...req.user });
};

exports.userStatus = async function (req, res) {
  // check auth
  if (!req.user) {
    return res.status(401).send({ error: 'no user' });
  }

  // console.log(req.user);
  return res.status(200).send(req.user);
};

exports.googleAuth = async function (req, res, next) {
  const userProfile = req.body.user;
  const token = req.body.token;

  try {
    // verify that the token is legit
    const googleEndpoint = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token.access_token}`;
    const googleResponse = await fetch(googleEndpoint).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log('Google Auth Failure', userProfile.email);
        res.status(401).send('Google Auth Failure');
      }
    });

    // find & upsert user
    const user = await UserModel.findOneAndUpdate(
      {
        email: googleResponse.email,
        status: 'Approved',
      },
      {
        firstname: userProfile.givenName,
        lastname: userProfile.familyName,
        displayName: userProfile.name,
        email: userProfile.email,
        avatar: userProfile.imageUrl,
        googleProvider: {
          id: userProfile.googleId,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // add user to request
    if (!user) {
      console.log('No user found:', googleResponse.email);
    } else {
      req.user = user.toObject();
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
