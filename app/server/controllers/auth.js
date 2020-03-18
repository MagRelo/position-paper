// const fetch = require('node-fetch');
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
  if (!req.user || !req.user.id) {
    console.log('getUser - no user id');
    return res.status(401).send({ error: 'getUser - no user id' });
  }
  next();
};

exports.getUser = async function(req, res, next) {
  if (req.user && req.user.id) {
    const user = await UserModel.findOne({ _id: req.user.id })
      .select('displayName avatar address description location radius')
      .lean();

    req.user = { ...user, ...req.user };
  }
  next();
};

exports.sendToken = function(req, res) {
  if (!req.user) {
    console.log('Send Token: user:', req.user);
    return res.status(401).send('User Not Authenticated');
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

  // console.log(req.user);
  return res.status(200).send(req.user);
};

exports.googleAuth = async function(req, res, next) {
  const userProfile = req.body;
  console.log(userProfile);

  try {
    // upsert user
    const user = await UserModel.findOneAndUpdate(
      {
        email: userProfile.email
      },
      {
        firstname: userProfile.givenName,
        lastname: userProfile.familyName,
        displayName: userProfile.name,
        email: userProfile.email,
        avatar: userProfile.imageUrl,
        googleProvider: {
          id: userProfile.googleId
        }
      },
      { new: true, upsert: false, setDefaultsOnInsert: true }
    );

    console.log('Auth: user:', user);

    // if good =>
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// exports.linkedinAuth = async function(req, res, next) {
//   try {
//     // get access token
//     const params = `grant_type=authorization_code&code=${req.body.access_code}&redirect_uri=${process.env['LINKEDIN_CALLBACK']}&client_id=${process.env['LINKEDIN_KEY']}&client_secret=${process.env['LINKEDIN_SECRET']}`;
//     const accessTokenResponse = await fetch(
//       'https://www.linkedin.com/oauth/v2/accessToken',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: params
//       }
//     ).then(response => {
//       if (response.status === 200) {
//         return response.json();
//       } else {
//         console.log('Get access token:', response.status, response.statusText);
//         throw Error(response);
//       }
//     });

//     // get profile data
//     const profileURI =
//       'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))';
//     const profile = await fetch(profileURI, {
//       method: 'GET',
//       headers: {
//         Connection: 'Keep-Alive',
//         Authorization: 'Bearer ' + accessTokenResponse.access_token
//       }
//     }).then(response => {
//       if (response.status === 200) {
//         return response.json();
//       } else {
//         console.log('Get profile data:', response.status, response.statusText);
//         throw Error(response);
//       }
//     });

//     // upsert user
//     req.user = await UserModel.findOneAndUpdate(
//       {
//         'linkedinProvider.id': profile.id
//       },
//       {
//         firstname: profile.firstName.localized.en_US,
//         lastname: profile.lastName.localized.en_US,
//         displayName:
//           profile.firstName.localized.en_US +
//           ' ' +
//           profile.lastName.localized.en_US,
//         avatar:
//           profile.profilePicture['displayImage~'].elements[1].identifiers[0]
//             .identifier,
//         linkedinProvider: {
//           id: profile.id,
//           access_token: accessTokenResponse.access_token
//         }
//       },
//       { new: true, upsert: true, setDefaultsOnInsert: true }
//     );

//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// };

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
