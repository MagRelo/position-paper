var express = require('express');
var router = express.Router();

const passport = require('passport');
const payments = require('./integrations/payments');

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
    // create a stripe customer
    const stripeAccount = await payments.createStripeAccount(req.body, req.ip);

    // merge stripe data with front-end form data
    const fullUserObject = Object.assign({}, { stripeAccount }, req.body);

    // create the user
    const user = new UserModel(fullUserObject);
    await user.save();

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

    // selsct a link
    const promises = [];
    queryGenList.forEach(query => {
      return promises.push(
        LinkModel.findOne({
          query: query._id,
          generation: query.latestGen
        }).populate({
          path: 'query'
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
router.get('/user', async function(req, res) {
  // check auth
  if (!req.user) {
    return res.status(401).send('no user');
  }

  // get queries and links
  const userObject = {
    name: req.user.name,
    email: req.user.email
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
  userObject.queries.forEach((query, index) => {
    userObject.queries[index].totalViews = query.links.reduce((acc, link) => {
      return acc + link.views;
    }, 0);
  });

  try {
    res.status(200).send(userObject);
  } catch (error) {
    console.log(req.path, error);
    res.status(500).send(error);
  }
});

// add query
router.post('/query/add', async function(req, res) {
  // check auth
  if (!req.user) {
    return res.status(401).send();
  }
  const query = req.body;

  try {
    // create query
    const newQuery = new QueryModel({
      title: query.title,
      bonus: query.bonus,
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
      payoffs: calcLinkPayouts(query.bonus, 1)
    });
    await newLink.save();

    // push link back into query
    await QueryModel.updateOne(
      { _id: newQuery._id },
      { $push: { links: newLink._id } }
    );

    const updatedQuery = await QueryModel.findOne({ _id: newQuery._id })
      .lean()
      .populate('links');

    res.status(200).send(updatedQuery);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

// list query
router.get('/query/list', async function(req, res) {
  // check auth
  if (!req.user) {
    return res.status(401).send();
  }

  try {
    const queryList = await QueryModel.find()
      .lean()
      .populate({ path: 'links', populate: { path: 'parentLink' } });

    res.status(200).send(queryList);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

// get query by linkId
router.get('/query/:linkId', async function(req, res) {
  try {
    // get link
    const link = await LinkModel.findOne({ linkId: req.params.linkId });
    if (!link) {
      return res.status(404).send('link not found');
    }

    // get query
    const query = await QueryModel.findOne({ _id: link.query })
      .lean()
      .populate({
        path: 'links',
        populate: { path: 'parentLink query' },
        options: { sort: { generation: 1 } }
      })
      .populate({
        path: 'responses',
        populate: { path: ' query' }
      });
    if (!query) {
      return res.status(404).send('profile not found');
    }

    // auth - only send to owner
    if (!req.user._id.equals(query.user)) {
      return res.status(401).send();
    }

    res.status(200).send(query);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// get link by linkId
router.get('/link/:linkId', async function(req, res) {
  try {
    // get link
    const link = await LinkModel.findOne({ linkId: req.params.linkId });
    if (!link) {
      return res.status(404).send('link not found');
    }

    let isLinkOwner = false;
    if (req.user) {
      isLinkOwner = req.user._id.equals(link.user);
    }

    // increment link views
    if (!isLinkOwner) {
      link.views += 1;
      link.save();
    }

    // get query
    const query = await QueryModel.findOne({ _id: link.query }).lean();
    if (!query) {
      return res.status(404).send('query not found');
    }

    // check user
    let isQueryOwner = false;
    if (req.user) {
      isQueryOwner = req.user._id.equals(query.user);
    }

    res.status(200).send({
      query: {
        _id: query._id,
        title: query.title,
        description: query.data.description
      },
      link: {
        generation: link.generation,
        payoffs: link.payoffs,
        isQueryOwner: isQueryOwner,
        isLinkOwner: isLinkOwner
      }
    });
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
    return res.status(400).send('must set query id');
  }

  try {
    // get parent link
    const parentLink = await LinkModel.findOne({
      linkId: req.body.parentLink
    }).populate({
      path: 'query'
    });
    if (!parentLink) {
      return res.status(404).send('parent link not found');
    }

    // add new link
    const newLink = new LinkModel({
      user: req.user._id,
      query: req.body.queryId,
      parentLink: parentLink._id,
      generation: parentLink.generation + 1,
      payoffs: calcLinkPayouts(
        parentLink.query.bonus,
        parentLink.generation + 2
      )
    });
    await newLink.save();

    // add link ref to parent link
    parentLink.children.push(newLink._id);
    await parentLink.save();

    // add link ref to query
    await QueryModel.updateOne(
      { _id: req.body.queryId },
      { $push: { links: newLink._id } }
    );

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
  if (!req.body.queryId) {
    return res.status(400).send('must set query id');
  }

  // get link
  const link = await LinkModel.findOne({ linkId: req.body.linkId });
  if (!link) {
    return res.status(404).send('link not found');
  }

  try {
    // add new response
    const newResponse = new ResponseModel({
      query: req.body.queryId,
      link: link._id,
      respondingUser: req.user._id
    });
    await newResponse.save();

    // add link ref to query
    await QueryModel.updateOne(
      { _id: req.body.queryId },
      { $push: { responses: newResponse._id } }
    );

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
    return res.status(400).send('must set responseId');
  }

  try {
    // get response
    const response = await ResponseModel.findOne({
      _id: req.params.responseId
    })
      .populate('query')
      .populate({
        path: 'link',
        populate: { path: 'user' }
      })
      .populate({
        path: 'respondingUser',
        select: 'name email'
      })
      .lean();
    if (!response) {
      return res
        .status(404)
        .send('response not found: ', req.params.responseId);
    }

    // populate with table of user payouts
    response.payoutArray = await calcUserPayouts(
      response.link,
      response.respondingUser
    );

    res.status(200).send(response);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

// create payment
router.post('/response/:responseId', async function(req, res) {
  // auth-only
  if (!req.user) {
    return res.status(401).send();
  }
  // validate input
  if (!req.params.responseId) {
    return res.status(400).send('must set responseId');
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
        path: 'link',
        populate: { path: 'user' }
      })
      .populate({
        path: 'respondingUser',
        select: 'name email'
      })
      .lean();

    // must have response
    if (!response) {
      return res
        .status(404)
        .send('response not found: ', req.params.responseId);
    }
    // auth - must be owner
    if (!req.user._id.equals(response.query.user._id)) {
      return res.status(401).send();
    }

    // create payment record
    const newPayment = new PaymentModel({
      user: req.user._id,
      query: response.query._id,
      link: response.link._id,
      parent: null,
      amount: response.query.bonus,
      isPayable: false,
      isPaid: false
    });
    newPayment.save();

    // create Stripe payment
    // const payment = await payments.createCharge(
    //   response.query.stripeCustomer.id,
    //   response.query.bonus
    // );

    // save stripe response
    // newPayment.data = payment;
    // newPayment.save();

    // create child payments
    const payouts = calcUserPayouts(response.link, response.query.user);

    // create account-to-account payments

    res.status(200).send({});
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

function calcLinkPayouts(bonus, generations) {
  let payoffs = [];
  let remaining = bonus;

  for (let precision = 3; precision > 0; precision--) {
    for (let i = 0; i < generations; i++) {
      const share = Math.round(remaining * 0.7 * 100) / 100;
      payoffs[i] = (payoffs[i] || 0) + share;
      remaining = remaining - share;
    }
  }

  const total = payoffs.reduce((acc, item) => {
    return acc + item;
  }, 0);

  // console.log(total);

  return payoffs;
}

async function calcUserPayouts(link, respondant) {
  let payoutArray = [];

  // first is always respondant
  payoutArray.push({
    _id: respondant._id,
    name: respondant.name,
    payout: link.payoffs[0]
  });

  // second is link owner
  payoutArray.push({
    _id: link.user._id,
    name: link.user.name,
    payout: link.payoffs[1]
  });

  // if parents
  const parents = await populateParent(link.parentLink, link.payoffs);
  recursionParents = []; //cleanup
  return payoutArray.concat(parents);
}

let recursionParents = [];
async function populateParent(parentLinkId, payoffs) {
  // get parent
  const link = await LinkModel.findOne({ _id: parentLinkId })
    .populate('user', 'name email')
    .lean();

  if (link && !link.isQueryOwner) {
    const distance = recursionParents.length;
    const payoff = payoffs[distance + 1];
    // console.log(distance, payoff);

    // push into array
    recursionParents.push(
      Object.assign({
        _id: link.user._id,
        name: link.user.name,
        payout: payoff
      })
    );

    if (link.parentLink) {
      return await populateParent(link.parentLink, payoffs);
    }
  }

  return recursionParents;
}

module.exports = router;
