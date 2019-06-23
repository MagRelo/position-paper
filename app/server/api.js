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

//

// login
router.post('/user/login', passport.authenticate('local'), function(req, res) {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    console.log(req.path, error);
    res.status(500).send(error);
  }
});

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

//
// AUTH
//

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
      generation: 0,
      payoffs: expectedValue(query.bonus, 1)
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
      payoffs: expectedValue(parentLink.query.bonus, parentLink.generation + 2)
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

function expectedValue(bonus, generations) {
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

  console.log(total);

  return payoffs;
}

module.exports = router;
