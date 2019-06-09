var express = require('express');
var router = express.Router();

const UserModel = require('./models').UserModel;
const QueryModel = require('./models').QueryModel;
const LinkModel = require('./models').LinkModel;

//
// PUBLIC
//

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

// get query by linkId
router.get('/query/:linkId', async function(req, res) {
  // validate input
  const linkId = parseInt(req.params.linkId, 10);
  if (typeof linkId != 'number') {
    return res.status(401).send('bad input: ' + typeof linkId);
  }

  try {
    const link = await LinkModel.findOne({ linkId: linkId });
    if (!link) {
      return res.status(401).send('link not found');
    }

    const profile = await QueryModel.findOne({ _id: link.profile });
    if (!profile) {
      return res.status(404).send('profile not found');
    }

    res.status(200).send(profile);
  } catch (error) {
    console.log('apierror');
    res.status(500).send(error);
  }
});

//
// AUTH
//

// add query
router.post('/query/add', async function(req, res) {
  const query = req.body;

  try {
    // create the query
    const newQuery = new QueryModel({ type: query.type, data: query.data });
    await newQuery.save();

    res.status(200).send(newQuery);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

// create link to query
router.post('/link/add', async function(req, res) {
  // validate input
  const userId = req.body.userId;
  const linkId = parseInt(req.body.parentLinkId, 10);
  if (typeof linkId != 'number') {
    return res.status(401).send('bad input: ' + typeof linkId);
  }

  try {
    // get existing link, add
    const link = await LinkModel.findOne({ linkId: linkId });

    // add new link(?)
    const newLink = new LinkModel({
      parentLinkId: link._id,
      profile: link.profile,
      user: userId
    });
    await newLink.save();

    res.status(200).send(newLink);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

module.exports = router;
