var express = require('express');
var router = express.Router();

const passport = require('passport');
const scrape = require('html-metadata');
const request = require('request');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const payments = require('./integrations/payments');
const getStream = require('./integrations/getstream');
const elasticSearch = require('./integrations/elasticsearch');
const twitter = require('./integrations/twitter');

const UserModel = require('./models').UserModel;
const LinkModel = require('./models').LinkModel;
const ResponseModel = require('./models').ResponseModel;
const PaymentModel = require('./models').PaymentModel;

//
// MIDDLEWARE
//

var getToken = expressJwt({
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

function authenticate(req, res, next) {
  if (req.user && !req.user.id) {
    console.log('getUser - no user id');
    return res.status(401).send({ error: 'getUser - no user id' });
  }
  next();
}

async function getUser(req, res, next) {
  if (req.user && req.user.id) {
    const user = await UserModel.findOne({ _id: req.user.id }).lean();
    req.user = { ...user, ...req.user };
  }
  next();
}

//
// MISC
//

// search
router.get('/search', getToken, getUser, async function(req, res) {
  try {
    const results = await LinkModel.find({
      isBuried: false
    })
      .populate('user')
      .then(linkArray => {
        return linkArray.map(link => {
          let responseObj = {
            link: {
              _id: link._id,
              linkId: link.linkId,
              postedBy: link.user.name,
              userId: link.user._id,
              createdAt: link.createdAt,
              respondBonus: link.target_bonus,
              promoteBonus: link.potentialPayoffs[link.generation + 1]
            },
            query: {
              _id: null,
              title: link.title,
              bonus: link.bonus,
              type: link.type,
              data: link.data
            }
          };

          // not logged in
          if (!req.user) {
            responseObj.user = {
              isFollowingLink: false,
              isFollowingUser: false,
              isQueryOwner: false,
              isLinkOwner: false,
              isLoggedIn: false
            };
            return responseObj;
          }

          // logged in
          responseObj.user = {
            isFollowingLink:
              req.user && req.user.follows.indexOf(link._id) > -1,
            isFollowingUser:
              req.user && req.user.follows.indexOf(link.user._id) > -1,
            isQueryOwner: false,
            isLinkOwner: req.user._id.equals(link.user._id),
            isLoggedIn: true
          };

          return responseObj;
        });
      });

    res.status(200).send(results);
  } catch (error) {
    console.log(req.path, error);
    res.status(500).send(error);
  }
});

router.post('/query/metadata', async function(req, res) {
  if (!req.body.url) {
    return res.status(400).send({ error: 'bad request' });
  }

  try {
    const metadata = await scrape(req.body.url);

    const salary = `$${metadata.jsonLd.baseSalary.value.minValue} – $${
      metadata.jsonLd.baseSalary.value.maxValue
    }`;
    const location = `${
      metadata.jsonLd.jobLocation[0].address.addressLocality
    }, ${metadata.jsonLd.jobLocation[0].address.addressRegion}`;
    // const description = `$${metadata.jsonLd.description}`;

    const formatted = {
      title: metadata.jsonLd.title,
      salary: salary,
      location: location,
      hiringOrganization: metadata.jsonLd.hiringOrganization.name,
      skills: metadata.jsonLd.skills,
      maxSalary: metadata.jsonLd.baseSalary.value.maxValue,
      minSalary: metadata.jsonLd.baseSalary.value.minValue,
      jobData: metadata.jsonLd
    };

    res.status(200).send(formatted);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

//
// USER
//

router.route('/auth/twitter/reverse').post(function(req, res) {
  request.post(
    {
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        callback: process.env['TWITTER_CALLBACK'],
        consumer_key: process.env['TWITTER_CONSUMER_KEY'],
        consumer_secret: process.env['TWITTER_CONSUMER_SECRET']
      }
    },
    function(err, r, body) {
      if (err) {
        return res.send(500, { message: err.message });
      }

      var jsonStr =
        '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    }
  );
});

router.route('/auth/twitter').post(
  (req, res, next) => {
    request.post(
      {
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
          consumer_key: process.env['TWITTER_CONSUMER_KEY'],
          consumer_secret: process.env['TWITTER_CONSUMER_SECRET'],
          token: req.query.oauth_token
        },
        form: { oauth_verifier: req.query.oauth_verifier }
      },
      function(err, r, body) {
        if (err) {
          return res.send(500, { message: err.message });
        }

        // console.log(body);
        const bodyString =
          '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        const parsedBody = JSON.parse(bodyString);

        req.body['oauth_token'] = parsedBody.oauth_token;
        req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
        req.body['user_id'] = parsedBody.user_id;

        return next();
      }
    );
  },
  passport.authenticate('twitter-token'),
  function(req, res) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }

    // create token
    const token = jwt.sign(
      {
        id: req.user.id
      },
      process.env['JWT_SECRET'],
      {
        expiresIn: 60 * 120
      }
    );

    return res.status(200).send({ token, ...req.user });
  }
);

// get user session status (loggedin)
router.get('/user/status', getToken, authenticate, getUser, async function(
  req,
  res
) {
  // check auth
  if (!req.user) {
    return res.status(401).send({ error: 'no user' });
  }
  return res.status(200).send({});
});

// get user
router.get('/user', getToken, authenticate, getUser, async function(req, res) {
  // check auth
  if (!req.user) {
    return res.status(401).send({ error: 'no user' });
  }

  // get queries and links
  const userObject = {
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      location: req.user.location,
      hasAccount: !!req.user.stripeAccountLabel,
      stripeAccountLabel: req.user.stripeAccountLabel
    },
    follows: req.user.follows,
    links: [],
    responses: [],
    payments: []
  };

  try {
    userObject.links = await LinkModel.find({ user: req.user._id }).lean();

    userObject.payments = await PaymentModel.find({ user: req.user._id })
      .populate('link')
      .lean();
    userObject.responses = await ResponseModel.find({
      user: req.user._id
    })
      .populate('link')
      .lean();

    // get user
    userObject.stream = await getStream.getFeed(
      'User',
      req.user._id,
      req.user._id
    );

    res.status(200).send(userObject);
  } catch (error) {
    console.log(req.path, error);
    res.status(500).send(error);
  }
});

router.post('/user/follow', getToken, authenticate, getUser, async function(
  req,
  res
) {
  // check auth
  if (!req.user) {
    return res.status(401).send();
  }

  // get id & intent from query string
  const intentToFollow = req.query.intent;
  const feedType = req.query.type;
  const targetId = req.query.target;

  // console.log('input: ', targetId, intentToFollow, feedType);

  // call getstream methods

  let getStreamResponse = '';
  try {
    if (intentToFollow) {
      // follow
      getStreamResponse = await getStream.follow(
        req.user._id,
        feedType,
        targetId
      );

      // add to user follow array
      await UserModel.update(
        { _id: req.user._id },
        { $push: { follows: targetId } }
      );
    } else {
      // unfollow
      getStreamResponse = await getStream.unFollow(
        req.user._id,
        feedType,
        targetId
      );

      // remove from user follow array
      await UserModel.update(
        { _id: req.user._id },
        { $pull: { follows: targetId } }
      );
    }

    res.status(200).send({ status: true });
  } catch (error) {
    console.log(getStreamResponse);
    res.status(500).send(error);
  }
});

// get user session status (loggedin)
router.get('/user/friends', getToken, authenticate, getUser, async function(
  req,
  res
) {
  try {
    // get twitter creds
    const user = await UserModel.findOne({ _id: req.user._id }).select(
      'twitterProvider'
    );
    const twitterCreds = user.twitterProvider;

    const friends = await twitter.getFriends(
      twitterCreds.token,
      twitterCreds.tokenSecret
    );
    return res.status(200).send(friends);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post('/user/tweet', getToken, authenticate, getUser, async function(
  req,
  res
) {
  const message = req.body.message;

  try {
    // get twitter creds
    const user = await UserModel.findOne({ _id: req.user._id }).select(
      'twitterProvider'
    );
    const twitterCreds = user.twitterProvider;

    const tweet = await twitter.postTweet(
      twitterCreds.token,
      twitterCreds.tokenSecret,
      message
    );
    return res.status(200).send(tweet);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// add bank account to stripe
router.post('/user/account', getToken, authenticate, getUser, async function(
  req,
  res
) {
  const userData = req.body;

  try {
    // register with plaid
    const stripeAccount = await payments.createStripeAccount(userData, req.ip);

    // update user
    await UserModel.updateOne(
      { _id: req.user._id },
      {
        stripeAccount: stripeAccount,
        stripeAccountLabel: userData.bankAccountLabel
      }
    );

    // send user
    return res.status(200).send({ connected: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//
// LINK
//

// add query
router.post('/query/add', getToken, authenticate, getUser, async function(
  req,
  res
) {
  // check auth
  if (!req.user) {
    return res.status(401).send({ error: 'no user' });
  }
  const query = req.body;

  try {
    // create link
    const newLink = new LinkModel({
      user: req.user._id,
      parentLink: null,
      isQueryOwner: true,
      generation: 0,
      target_bonus: query.target_bonus,
      network_bonus: query.network_bonus,
      title: query.title,
      type: query.type,
      data: query.data,
      payoffs: calcLinkPayouts(query.network_bonus, 0),
      potentialPayoffs: calcLinkPayouts(query.network_bonus, 1)
    });
    await newLink.save();

    // create getStream feed for user
    await getStream.addQuery(req.user, newLink._id);

    res.status(200).send(newLink);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

// get link by linkId
router.get('/link/:linkId', getToken, getUser, async function(req, res) {
  try {
    // get link
    const link = await LinkModel.findOne({
      linkId: req.params.linkId
    })
      .populate('user')
      .populate({ path: 'children', populate: { path: 'user' } })
      .populate({ path: 'responses', populate: { path: 'user' } });
    if (!link) return res.status(401).send({ error: 'not found' });

    // public info
    let responseObj = {
      query: {
        _id: null,
        title: link.title,
        type: link.type,
        data: link.data,
        target_bonus: link.target_bonus,
        network_bonus: link.network_bonus,
        postedBy: link.user.email
      },
      link: {
        _id: link._id,
        linkId: link.linkId,
        userId: link.user._id,
        createdAt: link.createdAt,
        generation: link.generation,
        parentLink: link.parentLink,
        children: link.children,
        payoffs: link.payoffs,
        potentialPayoffs: link.potentialPayoffs
      }
    };

    if (!req.user) {
      responseObj.user = {
        _id: 0,
        isQueryOwner: false,
        isFollowingUser: false,
        isLinkOwner: false,
        isFollowingLink: false
      };

      return res.status(200).send(responseObj);
    }

    // display indicators
    const isFollowingLink =
      req.user && req.user.follows.indexOf(link._id.toString()) > -1;
    const isFollowingUser =
      req.user && req.user.follows.indexOf(link.user._id.toString()) > -1;
    const isLinkOwner = req.user._id.equals(link.user._id);
    // const isQueryOwner = link.generation === 0;

    // user
    responseObj.user = {
      _id: req.user._id,
      isFollowingUser: isFollowingUser,
      isLinkOwner: isLinkOwner,
      isFollowingLink: isFollowingLink
    };

    // traffic
    responseObj.traffic = await elasticSearch.getLinkTraffic(link._id);
    // activity
    responseObj.stream = await getStream.getFeed(
      'Link',
      link._id,
      req.user._id
    );
    // responses
    responseObj.responses = link.responses;

    res.status(200).send(responseObj);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// create link
router.post('/link/add', getToken, authenticate, getUser, async function(
  req,
  res
) {
  // auth-only
  if (!req.user) {
    return res.status(401).send();
  }

  try {
    // get parent link
    const parentLink = await LinkModel.findOne({
      linkId: req.body.parentLink
    });
    if (!parentLink) {
      return res.status(404).send({ error: 'parent link not found' });
    }

    // set up generation
    const thisGen = parentLink.generation + 1;
    const nextGen = parentLink.generation + 2;

    // add new link
    const newLink = new LinkModel({
      user: req.user._id,
      parentLink: parentLink._id,
      parents: [...parentLink.parents, parentLink._id],
      originLink: parentLink.originLink
        ? parentLink.originLink
        : parentLink._id,
      generation: thisGen,
      target_bonus: parentLink.target_bonus,
      network_bonus: parentLink.network_bonus,
      title: parentLink.title,
      type: parentLink.type,
      data: parentLink.data,
      payoffs: calcLinkPayouts(parentLink.network_bonus, thisGen),
      potentialPayoffs: calcLinkPayouts(parentLink.network_bonus, nextGen)
    });
    await newLink.save();

    // add child to to all parent's 'children' array &
    // set IsBuried = true to exclude parents from search
    await LinkModel.updateMany(
      { _id: { $in: [...parentLink.parents, parentLink._id] } },
      { $push: { children: newLink._id }, $set: { isBuried: true } },
      { multi: true }
    );

    // add getStream activity "AddLink"
    await getStream.addLink(req.user, newLink);

    res.status(200).send(newLink);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

//
// RESPONSE
//

// create response
router.post('/response/add', getToken, authenticate, getUser, async function(
  req,
  res
) {
  // auth-only
  if (!req.user) {
    return res.status(401).send();
  }

  // validate input
  if (!req.body.linkId) {
    return res.status(400).send({ error: 'must set link id' });
  }

  try {
    // get link
    const link = await LinkModel.findOne({ linkId: req.body.linkId })
      .populate({
        path: 'user'
      })
      .populate({
        path: 'parents',
        populate: { path: 'user' }
      });
    if (!link) {
      return res.status(404).send({ error: 'link not found' });
    }

    // add new response
    const newResponse = new ResponseModel({
      link: link._id,
      originLink: link.originLink,
      target_bonus: link.target_bonus,
      targetPayouts: [
        {
          _id: req.user._id,
          email: req.user.name,
          amount: link.target_bonus,
          linkId: link._id
        }
      ],
      network_bonus: link.network_bonus,
      networkPayouts: calcUserPayouts(link, link.parents),
      user: req.user._id,
      message: req.body.message
    });
    await newResponse.save();

    // add response to gen-0 link
    await LinkModel.updateOne(
      { _id: { $in: link.parents }, generation: 0 },
      { $push: { responses: newResponse._id } }
    );

    // add getStream activity "addResponse"
    await getStream.addResponse(req.user, link, newResponse);

    res.status(200).send(newResponse);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

// get response
router.get(
  '/response/:responseId',
  getToken,
  authenticate,
  getUser,
  async function(req, res) {
    // auth-only
    if (!req.user) {
      return res.status(401).send();
    }

    // validate input
    if (!req.params.responseId) {
      return res.status(400).send({ error: 'must set responseId' });
    }

    try {
      // get response
      const response = await ResponseModel.findOne({
        _id: req.params.responseId
      })
        .populate({
          path: 'link',
          populate: { path: 'user' }
        })
        .populate({
          path: 'originLink',
          populate: { path: 'user' }
        })
        .populate({
          path: 'user',
          select: 'name email avatar'
        })
        .lean();
      if (!response) {
        return res
          .status(404)
          .send({ error: 'response not found: ' + req.params.responseId });
      }

      // display indicators
      if (response.originLink) {
        // this is a secondary link
        response.user.isQueryOwner = req.user._id.equals(
          response.originLink.user._id
        );
      } else {
        // this is a primary link
        response.user.isQueryOwner = req.user._id.equals(
          response.link.user._id
        );
      }

      response.user.isParent = response.parents.some(parent => {
        return req.user._id.equals(parent);
      });
      response.user.isResponseOwner = req.user._id.equals(response.user._id);

      // const isLinkOwner = req.user._id.equals(response.link._id);
      // response.user.isLinkOwner = isLinkOwner;

      res.status(200).send(response);
    } catch (error) {
      console.log('API Error:', error);
      res.status(500).send(error);
    }
  }
);

// close response (create payment)
router.put(
  '/response/:responseId',
  getToken,
  authenticate,
  getUser,
  async function(req, res) {
    // auth-only
    if (!req.user) {
      return res.status(401).send();
    }

    // validate input
    if (!req.params.responseId) {
      return res.status(400).send({ error: 'must set responseId' });
    }

    try {
      // get response
      const response = await ResponseModel.findOne({
        _id: req.params.responseId
      })
        .populate({
          path: 'user'
        })
        .populate({
          path: 'link',
          populate: { path: 'user' }
        })
        .populate({
          path: 'parents',
          populate: { path: 'user' }
        })
        .lean();

      // must have response
      if (!response) {
        return res
          .status(404)
          .send({ error: 'response not found: ' + req.params.responseId });
      }

      // auth - must be query owner
      // if (!req.user._id.equals(response.query.user._id)) {
      //   return res.status(401).send();
      // }

      // make stripe payment from principal
      const paymentResponse = await payments.createStripeCharge(
        req.body.tokenData,
        req.body.amount_in_cents,
        response._id.toString()
      );

      // create payment record
      await createPayment(
        response.link._id,
        req.user._id,
        response._id,
        req.body.amount_in_cents * -1,
        paymentResponse,
        'closed'
      );

      // update response with payment detail
      await ResponseModel.updateOne(
        { _id: response._id },
        { payment: paymentResponse, status: 'closed' }
      );

      // update links to 'closed' status
      await LinkModel.updateMany(
        { _id: { $in: [...response.link.parents, response.link._id] } },
        { status: 'closed' }
      );

      // create target payouts to users
      await Promise.all(
        response.targetPayouts.map(userPayout => {
          return createPayment(
            userPayout.linkId,
            userPayout._id,
            response._id,
            userPayout.amount * 100
          );
        })
      );

      // create network payouts to users
      await Promise.all(
        response.networkPayouts.map(userPayout => {
          return createPayment(
            userPayout.linkId,
            userPayout._id,
            response._id,
            userPayout.amount * 100
          );
        })
      );

      res.status(200).send(paymentResponse);
    } catch (error) {
      console.log('API Error:', error);
      res.status(500).send(error);
    }
  }
);

module.exports = router;

// used when adding a link
function calcLinkPayouts(bonus, generation) {
  // take 10% of bonus per generation
  const shareBite = 0.1;
  let remaining = bonus;
  let payoffs = [];

  // insert generation zero ($0)
  payoffs.push(0);

  // each generation *after* the first one. not 0 OR 1 => gen-1 will get "remaining" below
  for (let i = 1; i < generation; i++) {
    const share = Math.round(bonus * shareBite * 10000) / 10000;
    payoffs[i] = share;
    remaining = remaining - share;
  }

  // insert remaining. not 0
  if (generation > 0) {
    payoffs.push(remaining);
  }

  return payoffs;
}

// used when adding a response
function calcUserPayouts(link, parents) {
  const payoutArray = [];
  parents.forEach(parent => {
    if (parent.generation > 0) {
      payoutArray.push({
        _id: parent.user._id,
        email: parent.user.name,
        amount: link.payoffs[parent.generation],
        linkId: link._id
      });
    }
  });

  // add link owner last
  if (link.generation > 0) {
    payoutArray.push({
      _id: link.user._id,
      email: link.user.name,
      amount: link.payoffs[link.generation],
      linkId: link._id
    });
  }

  return payoutArray;
}

// used when closing a response
async function createPayment(
  linkId,
  userId,
  responseId,
  amount_in_cents,
  stripeResponse,
  status
) {
  // create payment record
  const newPayment = new PaymentModel({
    link: linkId,
    user: userId,
    response: responseId,
    amount: amount_in_cents,
    stripeResponse: stripeResponse,
    status: status
  });
  return newPayment.save().then(paymentDoc => {
    return UserModel.updateOne(
      { _id: userId },
      { $push: { payments: paymentDoc._id } }
    );
  });
}
