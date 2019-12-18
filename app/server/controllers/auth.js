const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
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

exports.linkedinAuth = async function(req, res, next) {
  try {
    // get access token
    const params = `grant_type=authorization_code&code=${req.body.access_code}&redirect_uri=${process.env['LINKEDIN_CALLBACK']}&client_id=${process.env['LINKEDIN_KEY']}&client_secret=${process.env['LINKEDIN_SECRET']}`;
    const accessTokenResponse = await fetch(
      'https://www.linkedin.com/oauth/v2/accessToken',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      }
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log('Get access token:', response.status, response.statusText);
        throw Error(response);
      }
    });

    // get profile data
    const profileURI =
      'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))';
    // const profileURI = 'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName)';
    const meResponse = await fetch(profileURI, {
      method: 'GET',
      headers: {
        Connection: 'Keep-Alive',
        Authorization: 'Bearer ' + accessTokenResponse.access_token
      }
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log('Get profile data:', response.status, response.statusText);
        throw Error(response);
      }
    });

    // upsert user
    const newUser = await UserModel.upsertLinkedinUser(
      accessTokenResponse.access_token,
      meResponse
    );

    req.user = newUser.toObject();
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

// exports.twitterReverse = function(req, res) {
//   request.post(
//     {
//       url: 'https://api.twitter.com/oauth/request_token',
//       oauth: {
//         callback: process.env['TWITTER_CALLBACK'],
//         consumer_key: process.env['TWITTER_CONSUMER_KEY'],
//         consumer_secret: process.env['TWITTER_CONSUMER_SECRET']
//       }
//     },
//     function(err, r, body) {
//       if (r.statusCode !== 200) {
//         return res.status(500).send({ message: r.statusMessage });
//       }

//       var jsonStr =
//         '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
//       res.send(JSON.parse(jsonStr));
//     }
//   );
// };

// exports.twitterAuth = function(req, res, next) {
//   request.post(
//     {
//       url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
//       oauth: {
//         consumer_key: process.env['TWITTER_CONSUMER_KEY'],
//         consumer_secret: process.env['TWITTER_CONSUMER_SECRET'],
//         token: req.query.oauth_token
//       },
//       form: { oauth_verifier: req.query.oauth_verifier }
//     },
//     function(err, r, body) {
//       if (err) {
//         return res.send(500, { message: err.message });
//       }

//       // console.log(body);
//       const bodyString =
//         '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
//       const parsedBody = JSON.parse(bodyString);

//       req.body['oauth_token'] = parsedBody.oauth_token;
//       req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
//       req.body['user_id'] = parsedBody.user_id;

//       return next();
//     }
//   );
// };

exports.sendToken = function(req, res) {
  if (!req.user) {
    return res.send(401, 'User Not Authenticated');
  }

  // create token
  const token = jwt.sign(
    {
      id: req.user._id
    },
    process.env['JWT_SECRET'],
    {
      expiresIn: 60 * 120
    }
  );

  return res.status(200).send({ token, ...req.user });
};

exports.userStatus = async function(req, res) {
  // check auth
  if (!req.user) {
    return res.status(401).send({ error: 'no user' });
  }
  return res.status(200).send({
    name: req.user.firstname + ' ' + req.user.lastname,
    avatar: req.user.avatar
  });
};
