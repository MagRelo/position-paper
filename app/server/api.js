var express = require('express');
var router = express.Router();

// Controllers
const {
  googleAuth,
  sendToken,
  getToken,
  authenticate,
  userStatus,
  getUser
} = require('./controllers/auth');

const { populateUser } = require('./controllers/user');

const UserModel = require('./models').UserModel;
const PersonModel = require('./models').PersonModel;
//
// MISC
//

router.post('/gethelp', async function(req, res) {
  try {
    const newPerson = new PersonModel({
      needsHelp: true,
      ...req.body
    });
    await newPerson.save();
    // console.log(result);

    // send to sendgrid
    // const sendGridResponse = await SendGrid.addContact(req.body);

    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
router.post('/givehelp', async function(req, res) {
  try {
    const response = await PersonModel.update(
      { email: req.body.email },
      {
        offeringHelp: true,
        ...req.body
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    console.log(response);

    // send to sendgrid
    // const sendGridResponse = await SendGrid.addContact(req.body);

    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

router.post('/add-org', async function(req, res) {
  try {
    const newUser = new UserModel({ ...req.body });
    await newUser.save();

    // send to sendgrid
    // const sendGridResponse = await SendGrid.addContact(req.body);

    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

//
// Org Users (non-admin)
//

router.get('/persons', getToken, authenticate, getUser, async function(
  req,
  res
) {
  try {
    const user = await UserModel.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(404).send({});
    }

    const personList = await PersonModel.find({
      location: {
        $near: {
          $geometry: user.location,
          $maxDistance: user.radius
        }
      }
    });

    res.status(200).send({ personList });
  } catch (error) {
    console.log(req.path, error);
    res.status(500).send(error);
  }
});

//
// Admin stuff
//
router.get('/pending-orgs', getToken, authenticate, getUser, async function(
  req,
  res
) {
  // admin only
  if (!req.user.type === 'Admin') {
    return res.status(401).send('Unauthorized');
  }

  try {
    const orgsList = await UserModel.find({ status: 'Pending' }).lean();

    // send to sendgrid
    // const sendGridResponse = await SendGrid.addContact(req.body);

    res.status(200).send({ orgsList });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

router.post('/add-user-admin', getToken, authenticate, getUser, async function(
  req,
  res
) {
  // admin only
  if (!req.user.type === 'Admin') {
    return res.status(401).send('Unauthorized');
  }

  try {
    const newUser = new UserModel({ status: 'Approved', ...req.body });

    await newUser.save();

    // send to sendgrid
    // const sendGridResponse = await SendGrid.addContact(req.body);

    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

router.post(
  '/approve-user-admin',
  getToken,
  authenticate,
  getUser,
  async function(req, res) {
    // admin only
    if (!req.user.type === 'Admin') {
      return res.status(401).send('Unauthorized');
    }

    try {
      const result = await UserModel.updateOne(
        { _id: req.body.userId },
        { status: 'Approved' }
      );

      console.log(result);

      // send to sendgrid
      // const sendGridResponse = await SendGrid.addContact(req.body);

      res.status(200).send({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  }
);

//
// AUTH
router.post('/auth/google', googleAuth, sendToken);
router.get('/auth/status', getToken, authenticate, getUser, userStatus);

//
// USER
//

router.get('/user', getToken, authenticate, getUser, populateUser);

module.exports = router;
