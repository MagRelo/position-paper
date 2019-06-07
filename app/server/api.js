var express = require('express');
var router = express.Router();

const UserModel = require('./models').UserModel;
const ProfileModel = require('./models').ProfileModel;
const LinkModel = require('./models').LinkModel;
const MessageModel = require('./models').MessageModel;

//
// PUBLIC
//

// add profile
router.post('/register/profile', async function(req, res) {
  // required

  const userProfile = req.body;

  try {
    // create the user
    const user = new UserModel(userProfile);
    await user.save();

    // add user id
    userProfile.user = user._id;

    // create the profile
    const profile = new ProfileModel(userProfile);
    await profile.save();

    // add profile id
    userProfile.profile = profile._id;

    // create a link
    const link = new LinkModel(userProfile);
    await link.save();

    res.status(200).send(link);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

router.post('/register/position', async function(req, res) {
  // required

  const userProfile = req.body;

  try {
    // create the profile
    const profile = new ProfileModel(userProfile);
    await profile.save();

    // add profile id
    userProfile.profile = profile._id;

    // create a link
    const link = new LinkModel(userProfile);
    await link.save();

    res.status(200).send(link);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

router.post('/register/user', async function(req, res) {
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

// get profile by link
router.get('/profile/:linkId', async function(req, res) {
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

    const profile = await ProfileModel.findOne({ _id: link.profile });
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

// add profile
router.post('/messages', async function(req, res) {
  try {
    const message = new MessageModel(req.body);
    await message.save();

    res.status(200).send(message);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

// create link
router.post('/link', async function(req, res) {
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

// router.post('/link', async function(req, res) {
//   // validate input
//   const userId = req.body.userId;
//   const linkId = parseInt(req.body.parentLinkId, 10);
//   if (typeof linkId != 'number') {
//     return res.status(401).send('bad input: ' + typeof linkId);
//   }

//   try {
//     // get existing link, add
//     const link = await LinkModel.findOne({ linkId: linkId });

//     const newLink = new LinkModel({
//       parentLinkId: link._id,
//       profile: link.profile,
//       user: userId
//     });
//     await newLink.save();

//     res.status(200).send(newLink);
//   } catch (error) {
//     console.log('API Error:', error);
//     res.status(500).send(error);
//   }
// });

module.exports = router;
