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

router.get('/user/network', authenticate, async function (req, res) {
  try {
    const feed = await getStream.getFeed('User', req.user._id, req.user._id);

    // the user & all their follows
    const networkUsers = await UserModel.find({
      _id: { $in: [req.user._id, ...req.user.follows] },
    })
      .sort({ units: -1 })
      .lean();

    const globalStats = await UserModel.aggregate([
      {
        $group: {
          _id: 'globalStats',
          units_StdDev: { $stdDevPop: '$units' },
          units_Avg: { $avg: '$units' },
        },
      },
    ]);
    const networkStats = await UserModel.aggregate([
      {
        $match: {
          _id: { $in: [req.user._id, ...req.user.follows] },
        },
      },
      {
        $group: {
          _id: 'networkStats',
          units_StdDev: { $stdDevPop: '$units' },
          units_Avg: { $avg: '$units' },
        },
      },
    ]);

    res.status(200).send({
      feed: feed,
      following: networkUsers,
      stats: {
        global_StdDev: globalStats[0].units_StdDev,
        global_avg: globalStats[0].units_Avg,
        network_StdDev: networkStats[0].units_StdDev,
        network_avg: networkStats[0].units_Avg,
      },
    });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

// router.get('/user', populateUser);

router.get('/user/:userId', async function (req, res) {
  try {
    const user = await UserModel.findOne({ _id: req.params.userId }).lean();

    const globalStats = await UserModel.aggregate([
      {
        $group: {
          _id: 'globalStats',
          units_StdDev: { $stdDevPop: '$units' },
          units_Avg: { $avg: '$units' },
        },
      },
    ]);
    const networkStats = await UserModel.aggregate([
      {
        $match: {
          _id: { $in: [req.user._id, ...req.user.follows] },
        },
      },
      {
        $group: {
          _id: 'networkStats',
          units_StdDev: { $stdDevPop: '$units' },
          units_Avg: { $avg: '$units' },
        },
      },
    ]);

    res.status(200).send({
      user,
      stats: {
        global_StdDev: globalStats[0].units_StdDev,
        global_avg: globalStats[0].units_Avg,
        network_StdDev: networkStats[0].units_StdDev,
        network_avg: networkStats[0].units_Avg,
      },
    });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

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

    // console.log(updatedUser);

    res.status(200).send(updatedUser);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

// FOLLOW USER & UNFOLLOW USER
router.put('/user/follow', authenticate, async function (req, res) {
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

// // derived from http://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Parallel_algorithm

// function map() {
//   emit(
//     1, // Or put a GROUP BY key here
//     {
//       sum: this.value, // the field you want stats for
//       min: this.value,
//       max: this.value,
//       count: 1,
//       diff: 0, // M2,n:  sum((val-mean)^2)
//     }
//   );
// }

// function reduce(key, values) {
//   var a = values[0]; // will reduce into here
//   for (var i = 1 /*!*/; i < values.length; i++) {
//     var b = values[i]; // will merge 'b' into 'a'

//     // temp helpers
//     var delta = a.sum / a.count - b.sum / b.count; // a.mean - b.mean
//     var weight = (a.count * b.count) / (a.count + b.count);

//     // do the reducing
//     a.diff += b.diff + delta * delta * weight;
//     a.sum += b.sum;
//     a.count += b.count;
//     a.min = Math.min(a.min, b.min);
//     a.max = Math.max(a.max, b.max);
//   }

//   return a;
// }

// function finalize(key, value) {
//   value.avg = value.sum / value.count;
//   value.variance = value.diff / value.count;
//   value.stddev = Math.sqrt(value.variance);
//   return value;
// }
