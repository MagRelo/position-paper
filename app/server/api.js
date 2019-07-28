var express = require('express');
var router = express.Router();

const passport = require('passport');
const scrape = require('html-metadata');

const payments = require('./integrations/payments');
const getStream = require('./integrations/getstream');
const elasticSearch = require('./integrations/elasticsearch');

const UserModel = require('./models').UserModel;
const QueryModel = require('./models').QueryModel;
const LinkModel = require('./models').LinkModel;
const ResponseModel = require('./models').ResponseModel;
const PaymentModel = require('./models').PaymentModel;

//
// PUBLIC
//

// plaid signup
router.post('/user/signup', async function(req, res) {
  // required
  // const plaid_publicToken = req.body.token;
  // const plaid_account = req.body.account;
  // if (!plaid_publicToken || !plaid_account) {
  //   return res.status(400).send('no token or account');
  // }

  try {
    // create stripe customer
    const stripeCustomer = await payments.createStripeCustomer(req.body);

    // merge stripe data with front-end form data
    // create the user
    const user = new UserModel(Object.assign({}, { stripeCustomer }, req.body));
    await user.save();

    // create getStream feed for user
    await getStream.addUser(user);
    // const stream = await getStream.getUser(user);

    req.login(user, function() {
      res.status(200).send(user);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// login
router.post('/user/login', passport.authenticate('local'), function(req, res) {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    console.log(req.path, error);
    res.status(500).send(error);
  }
});

// search
router.get('/search', async function(req, res) {
  try {
    // get the max gen for each query
    const queryGenList = await LinkModel.aggregate([
      {
        $group: {
          _id: '$query',
          latestGen: { $max: '$generation' }
        }
      }
    ]);

    const promises = [];
    queryGenList.forEach(query => {
      return promises.push(
        LinkModel.findOne({
          query: query._id,
          generation: query.latestGen
        })
          .populate('user query')
          .then(link => {
            let responseObj = {
              link: {
                _id: link._id,
                linkId: link.linkId,
                postedBy: link.user.email,
                userId: link.user._id,
                createdAt: link.createdAt,
                respondBonus: link.query.target_bonus,
                promoteBonus: link.potentialPayoffs[link.generation + 1]
              },
              query: {
                _id: link.query._id,
                title: link.query.title,
                bonus: link.query.bonus,
                type: link.query.type,
                data: link.query.data
              }
            };

            // not logged in
            if (!req.user) {
              responseObj.user = {
                isFollowingLink: false,
                isFollowingUser: false,
                isQueryOwner: false,
                isLinkOwner: false
              };
              return responseObj;
            }

            // logged in
            responseObj.user = {
              isFollowingLink:
                req.user && req.user.follows.indexOf(link._id) > -1,
              isFollowingUser:
                req.user && req.user.follows.indexOf(link.user._id) > -1,
              isQueryOwner: req.user._id.equals(link.user._id),
              isLinkOwner: req.user._id.equals(link.query.user)
            };

            return responseObj;
          })
      );
    });

    const hydrated = await Promise.all(promises);

    res.status(200).send(hydrated);
  } catch (error) {
    console.log(req.path, error);
    res.status(500).send(error);
  }
});

//
// AUTH
//

// get user
router.get('/user/status', async function(req, res) {
  // check auth
  if (!req.user) {
    return res.status(401).send({ error: 'no user' });
  }

  return res.status(200).send({});
});

// get user
router.get('/user', async function(req, res) {
  // check auth
  if (!req.user) {
    return res.status(401).send({ error: 'no user' });
  }

  // get queries and links
  const userObject = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    follows: req.user.follows
  };

  userObject.queries = await QueryModel.find({ user: req.user._id })
    .populate({
      path: 'links',
      populate: { path: 'parentLink query' },
      options: { sort: { generation: 1 } }
    })
    .lean();
  userObject.links = await LinkModel.find({ user: req.user._id })
    .populate({
      path: 'query'
    })
    .lean();

  // hack to add total link views
  // userObject.queries.forEach((query, index) => {
  //   userObject.queries[index].totalViews = query.links.reduce((acc, link) => {
  //     return acc + link.views;
  //   }, 0);
  // });

  // get user
  userObject.stream = await getStream.getFeed(
    'User',
    req.user._id,
    req.user._id
  );

  try {
    res.status(200).send(userObject);
  } catch (error) {
    console.log(req.path, error);
    res.status(500).send(error);
  }
});

router.post('/user/follow', async function(req, res) {
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
      minSalary: metadata.jsonLd.baseSalary.value.minValue
    };

    res.status(200).send(formatted);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

// add query
router.post('/query/add', async function(req, res) {
  // check auth
  if (!req.user) {
    return res.status(401).send({ error: 'no user' });
  }
  const query = req.body;

  try {
    // create query
    const newQuery = new QueryModel({
      target_bonus: query.target_bonus,
      network_bonus: query.network_bonus,
      title: query.title,
      type: query.type,
      data: query.data,
      user: req.user._id
    });
    await newQuery.save();

    // create link
    const newLink = new LinkModel({
      user: req.user._id,
      query: newQuery._id,
      parentLink: null,
      isQueryOwner: true,
      generation: 0,
      payoffs: calcLinkPayouts(query.network_bonus, 0),
      potentialPayoffs: calcLinkPayouts(query.network_bonus, 1)
    });
    await newLink.save();

    // push link back into query
    await QueryModel.updateOne(
      { _id: newQuery._id },
      { $push: { links: newLink._id } }
    );

    // create getStream feed for user
    await getStream.addQuery(req.user, newLink._id);

    res.status(200).send(newLink);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

// get link by linkId
router.get('/link/:linkId', async function(req, res) {
  try {
    // get link
    const link = await LinkModel.findOne({
      linkId: req.params.linkId
    })
      .populate('user query children')
      .populate({ path: 'responses', populate: { path: 'user' } });
    if (!link) return res.status(401).send({ error: 'not found' });

    // public info
    let responseObj = {
      query: {
        _id: link.query._id,
        title: link.query.title,
        type: link.query.type,
        data: link.query.data,
        target_bonus: link.query.target_bonus,
        network_bonus: link.query.network_bonus,
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
    const isFollowingLink = req.user && req.user.follows.indexOf(link._id) > -1;
    const isFollowingUser =
      req.user && req.user.follows.indexOf(link.user._id) > -1;
    const isLinkOwner = req.user._id.equals(link.user._id);
    const isQueryOwner = req.user._id.equals(link.query.user);

    // user
    responseObj.user = {
      _id: req.user._id,
      isQueryOwner: isQueryOwner,
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
router.post('/link/add', async function(req, res) {
  // auth-only
  if (!req.user) {
    return res.status(401).send();
  }

  // validate input
  if (!req.body.queryId) {
    return res.status(400).send({ error: 'must set query id' });
  }

  try {
    // get parent link
    const parentLink = await LinkModel.findOne({
      linkId: req.body.parentLink
    }).populate({
      path: 'query'
    });
    if (!parentLink) {
      return res.status(404).send({ error: 'parent link not found' });
    }

    // add new link
    const newLink = new LinkModel({
      user: req.user._id,
      query: req.body.queryId,
      parentLink: parentLink._id,
      parents: [...parentLink.parents, parentLink._id],
      generation: parentLink.generation + 1,
      payoffs: calcLinkPayouts(
        parentLink.query.network_bonus,
        parentLink.generation + 1
      ),
      potentialPayoffs: calcLinkPayouts(
        parentLink.query.network_bonus,
        parentLink.generation + 2
      )
    });
    await newLink.save();

    // add child to to all parents 'children'
    await LinkModel.updateMany(
      { _id: { $in: [...parentLink.parents, parentLink._id] } },
      { $push: { children: newLink._id } },
      { multi: true }
    );

    // add link ref to query
    await QueryModel.updateOne(
      { _id: req.body.queryId },
      { $push: { links: newLink._id } }
    );

    // add getStream activity "AddLink"
    await getStream.addLink(req.user, newLink);

    res.status(200).send(newLink);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

// create response
router.post('/response/add', async function(req, res) {
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
    const link = await LinkModel.findOne({ linkId: req.body.linkId });
    if (!link) {
      return res.status(404).send({ error: 'link not found' });
    }

    // add new response
    const newResponse = new ResponseModel({
      query: link.query,
      link: link._id,
      target_bonus: link.target_bonus,
      targetPayouts: [],
      network_bonus: link.network_bonus,
      networkPayouts: [],
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
router.get('/response/:responseId', async function(req, res) {
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
        path: 'query',
        populate: { path: 'user' }
      })
      .populate({
        path: 'parents',
        populate: { path: 'user' }
      })
      .populate({
        path: 'link',
        populate: { path: 'user' }
      })
      .populate({
        path: 'user',
        select: 'name email'
      })
      .lean();
    if (!response) {
      return res
        .status(404)
        .send({ error: 'response not found: ' + req.params.responseId });
    }

    // populate with table of user payouts
    response.payoutArray = await calcUserPayouts(
      response.link,
      response.parents,
      req.user
    );

    // display indicators
    const isParent = response.parents.some(parent => {
      return req.user._id.equals(parent.user._id);
    });
    const isQueryOwner = req.user._id.equals(response.query.user._id);
    const isResponseOwner = req.user._id.equals(response.user._id);
    const isLinkOwner = req.user._id.equals(response.link._id);
    response.user.isQueryOwner = isQueryOwner;
    response.user.isResponseOwner = isResponseOwner;
    response.user.isParent = isParent;
    response.user.isLinkOwner = isLinkOwner;

    res.status(200).send(response);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

// create payment
router.post('/payment/:responseId', async function(req, res) {
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
        path: 'query',
        populate: { path: 'user' }
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
    if (!req.user._id.equals(response.query.user._id)) {
      return res.status(401).send();
    }

    // make stripe payment from principal
    const paymentResponse = await payments.createStripeCharge(
      req.body.tokenData,
      req.body.amount_in_cents,
      response._id.toString()
    );

    // update query with payment detail
    await QueryModel.updateOne(
      { _id: response.query._id },
      { payment: paymentResponse, status: 'closed' }
    );

    // update links to 'closed' status
    await LinkModel.updateMany(
      { _id: { $in: response.parents } },
      { status: 'closed' }
    );

    // create payouts to users
    const payouts = calcUserPayouts(response.link, response.parents, req.user);
    await Promise.all(
      payouts.map(userPayout => {
        return createPayment(
          response.query._id,
          response.link._id,
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
});

module.exports = router;

function calcLinkPayouts(bonus, generation) {
  // take 10% of bonus per gerneration
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

function calcUserPayouts(link, parents, user) {
  const payoutArray = [];
  parents.forEach(parent => {
    if (parent.generation > 0) {
      payoutArray.push({
        _id: parent.user._id,
        email: parent.user.email,
        amount: link.payoffs[parent.generation]
      });
    }
  });

  // add link owner last
  if (link.generation > 0) {
    payoutArray.push({
      _id: link.user._id,
      email: link.user && link.user.email,
      amount: link.payoffs[link.generation]
    });
  }

  return payoutArray;
}

async function createPayment(
  queryId,
  linkId,
  userId,
  responseId,
  amount_in_cents
) {
  // create payment record
  const newPayment = new PaymentModel({
    query: queryId,
    link: linkId,
    user: userId,
    response: responseId,
    amount: amount_in_cents
  });
  return newPayment.save().then(paymentDoc => {
    return UserModel.updateOne(
      { _id: userId },
      { $push: { payments: paymentDoc._id } }
    );
  });
}
