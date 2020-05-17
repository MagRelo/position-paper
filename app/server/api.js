var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

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
router.get('/props/:propId', async function(req, res) {
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
router.get('/props', async function(req, res) {
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
router.post('/props', authenticate, async function(req, res) {
  try {
    // get latest
    const newPosition = new PositionModel({ user: req.user._id, ...req.body });
    await newPosition.save();

    // save on user
    await UserModel.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { positions: newPosition._id } }
    );

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

router.get('/user/network', authenticate, async function(req, res) {
  try {
    const feed = await getStream.getFeed('User', req.user._id, req.user._id);

    // the user & all their follows
    const networkUsers = await UserModel.find({
      _id: { $in: [req.user._id, ...req.user.follows] },
    })
      .sort({ units: -1 })
      .lean();

    const stats = await getStats(req.user);

    res.status(200).send({
      feed: feed,
      following: networkUsers,
      stats: stats,
    });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

// router.get('/user', populateUser);

router.get('/user/:userId', async function(req, res) {
  try {
    const user = await UserModel.findOne({ _id: req.params.userId })
      .populate('positions')
      .lean();

    const stats = await getStats(user);
    res.status(200).send({
      user,
      stats: stats,
    });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

// UPDATE PROFILE
router.put('/user', authenticate, async function(req, res) {
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

    // console.log(updatedUser);

    res.status(200).send(updatedUser);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

// FOLLOW USER & UNFOLLOW USER
router.put('/user/follow', authenticate, async function(req, res) {
  try {
    const intentToFollow = req.query.intent === 'true';
    const feedType = req.query.type;
    const targetId = req.query.target;

    let updatedUser = null;

    if (intentToFollow) {
      console.log('add follow', targetId);
      // follow
      await getStream.follow(req.user._id, feedType, targetId);

      // add to user follow array
      updatedUser = await UserModel.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { follows: targetId } },
        { new: true }
      );
    } else {
      console.log('unfollow', targetId);

      // unfollow
      await getStream.unFollow(req.user._id, feedType, targetId);

      // remove from user follow array
      updatedUser = await UserModel.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { follows: targetId } },
        { new: true }
      );
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;

//
async function getStats(user) {
  const globalStats = await UserModel.aggregate([
    {
      $group: {
        _id: 'globalStats',
        units_StdDev: { $stdDevPop: '$units' },
        units_Avg: { $avg: '$units' },
        globalCount: { $sum: 1 },
      },
    },
  ]);

  // convert "follows" strings into ObjectId's
  const objs = user.follows.map((userId) => ObjectId(userId));
  const networkStats = await UserModel.aggregate([
    {
      $match: {
        _id: { $in: [user._id, ...objs] },
      },
    },
    {
      $group: {
        _id: 'networkStats',
        units_StdDev: { $stdDevPop: '$units' },
        units_Avg: { $avg: '$units' },
        networkCount: { $sum: 1 },
      },
    },
  ]);

  return {
    global_StdDev: globalStats[0].units_StdDev,
    global_avg: globalStats[0].units_Avg,
    globalCount: globalStats[0].globalCount,
    network_StdDev: networkStats[0].units_StdDev,
    network_avg: networkStats[0].units_Avg,
    networkCount: networkStats[0].networkCount,
  };
}
