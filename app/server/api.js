var express = require('express');
var router = express.Router();

const passport = require('passport');

const UserModel = require('./models').UserModel;
const QueryModel = require('./models').QueryModel;
const LinkModel = require('./models').LinkModel;

//
// PUBLIC
//

// add
router.post('/user/add', async function(req, res) {
  // required

  const userProfile = req.body;

  try {
    // create the user
    const user = new UserModel(userProfile);
    await user.save();

    res.status(200).send(user);
  } catch (error) {
    console.log('API Error:', error);
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

router.get('/user', async function(req, res) {
  // check auth
  if (!req.user) {
    return res.status(401);
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

//
// AUTH
//

// add query
router.post('/query/add', async function(req, res) {
  // check auth
  if (!req.user) {
    return res.status(401);
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
      generation: 0,
      payoff: newQuery.bonus,
      userPayoff: 0
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
    return res.status(401);
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

// get query by linkId
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
        payoff: link.payoff,
        userPayoff: link.userPayoff,
        nextUserPayoff: link.nextUserPayoff,
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
  console.log('hit');

  // auth-only
  if (!req.user) {
    return res.status(401).send();
  }

  // validate
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
      payoff: expectedValue(
        parentLink.query.bonus,
        parentLink.generation + 1,
        parentLink.generation + 1
      ),
      userPayoff: expectedValue(
        parentLink.query.bonus,
        parentLink.generation + 1,
        parentLink.generation
      ),
      nextUserPayoff: expectedValue(
        parentLink.query.bonus,
        parentLink.generation + 2,
        parentLink.generation + 1
      )
    });
    await newLink.save();

    // add link ref to parent
    parentLink.children.push(newLink._id);
    await parentLink.save();

    // add new link to query
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

function expectedValue(bonus, generation, position) {
  // console.log(bonus, distance, links, views);

  const payoffs = [
    [1],
    [0.2, 0.8],
    [0.1, 0.25, 0.65],
    [0.05, 0.125, 0.25, 0.575],
    [0.04, 0.06, 0.12, 0.28, 0.5]
  ];

  // const payoffs = [1, 0.8, 0.7, 0.575, 0.5];

  const payoff = bonus * payoffs[generation][position];

  return Math.round(payoff * 100) / 100;
}

module.exports = router;
