var express = require('express');
var router = express.Router();

// const SendGrid = require('./integrations/sendgrid');
const getStream = require('./integrations/getstream');

// Controllers
const { authenticate } = require('./controllers/magic-auth');
const { populateUser } = require('./controllers/user');

// const UserModel = require('./models').UserModel;
const PositionModel = require('./models').PositionModel;
const UserModel = require('./models').UserModel;

//
// PROPS
//

// GET ONE
router.get('/props/:propId', async function (req, res) {
  try {
    // get latest
    const prop = await PositionModel.findOne({
      _id: req.params.propId,
    })
      .populate('user')
      .lean();

    if (!prop) {
      return res.status(404).send({ error: 'notfound' });
    }

    res.status(200).send({ prop: prop });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

// GET MULTIPLE
router.get('/props', async function (req, res) {
  try {
    // check for filters

    let query = {};
    if (req.query.user) {
      query.user = req.query.user;
    }
    // console.log(req.query, query);

    const propsList = await PositionModel.find(query)
      .populate('user')
      .sort({ createdAt: 1 })
      .lean();
    res.status(200).send({ props: propsList });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

// ADD POSITION
router.post('/props', authenticate, async function (req, res) {
  try {
    // get latest
    const newPosition = new PositionModel({ user: req.user._id, ...req.body });
    await newPosition.save();

    //add position to User's feed
    await getStream.addPosition(req.user, newPosition);

    res.status(201).send(newPosition);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

//
// USER
//

router.get('/user/network', authenticate, async function (req, res) {
  try {
    const feed = await getStream.getFeed('User', req.user._id, req.user._id);

    const user = await UserModel.findOne({ _id: req.user._id })
      .populate('follows')
      .lean();

    console.log(user);

    res.status(200).send({ feed: feed, following: user.follows });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

router.get('/user', populateUser);

// UPDATE PROFILE
router.put('/user', authenticate, async function (req, res) {
  try {
    // get latest
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        displayName: req.body.displayName,
        avatar: req.body.avatar,
        caption: req.body.caption,
      },
      { new: true }
    );

    console.log(updatedUser);

    res.status(200).send(updatedUser);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

// FOLLOW USER & UNFOLLOW USER
router.put('/user/follow', authenticate, async function (req, res) {
  try {
    const intentToFollow = req.query.intent;
    const feedType = req.query.type;
    const targetId = req.query.target;

    let getStreamResponse = '';
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

    res.status(200).send(getStreamResponse);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
