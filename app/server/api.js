var express = require('express');
var router = express.Router();

// const SendGrid = require('./integrations/sendgrid');

// Controllers
const { authenticate } = require('./controllers/magic-auth');
const { populateUser } = require('./controllers/user');

// const UserModel = require('./models').UserModel;
const PositionModel = require('./models').PositionModel;
const UserModel = require('./models').UserModel;

//
// MISC
//

router.get('/props/:propId', async function (req, res) {
  try {
    // get latest
    const prop = await PositionModel.findOne({
      _id: req.params.propId,
    }).lean();

    if (!prop) {
      return res.status(404).send({ error: 'notfound' });
    }

    res.status(200).send({ prop: prop });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

router.get('/props', async function (req, res) {
  try {
    // check for filters

    let query = {};
    if (req.query.user) {
      query.user = req.query.user;
    }
    // console.log(req.query, query);

    const propsList = await PositionModel.find(query)
      .sort({ createdAt: 1 })
      .lean();
    res.status(200).send({ props: propsList });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

// add
router.post('/props', authenticate, async function (req, res) {
  try {
    // get latest
    const newProp = new PositionModel({ user: req.user._id, ...req.body });
    await newProp.save();

    res.status(201).send(newProp);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

//
// Org Users (non-admin)
//
//
// USER
//

router.get('/user', populateUser);

// add
router.put('/user', authenticate, async function (req, res) {
  try {
    // get latest
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        displayName: req.body.displayName,
        avatar: req.body.avatar,
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

module.exports = router;
