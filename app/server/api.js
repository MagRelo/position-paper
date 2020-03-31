var express = require('express');
var router = express.Router();

const SendGrid = require('./integrations/sendgrid');

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
    const sendGridResponse = await SendGrid.sendEmail(
      'getHelp',
      newPerson.toObject()
    );
    // console.log(sendGridResponse);

    // save response
    newPerson.welcomeEmail = sendGridResponse;
    await newPerson.save();

    res.status(200).send({ success: true });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});
router.post('/givehelp', async function(req, res) {
  try {
    const newPerson = new PersonModel({
      offeringHelp: true,
      ...req.body
    });
    await newPerson.save();
    // console.log(newPerson);

    // send to sendgrid
    const sendGridResponse = await SendGrid.sendEmail(
      'giveHelp',
      newPerson.toObject()
    );
    // console.log(sendGridResponse);

    // save response
    newPerson.welcomeEmail = sendGridResponse;
    await newPerson.save();

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
    const sendGridResponse = await SendGrid.sendEmail(
      'newOrg',
      newUser.toObject()
    );
    // console.log(sendGridResponse);

    // save response
    newUser.welcomeEmail = sendGridResponse;
    await newUser.save();

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
    const user = await UserModel.findOne({ _id: req.user._id }).lean();

    if (!user) {
      return res.status(404).send({});
    }

    // build query based on the different types of points
    let geoQuery = null;
    switch (user.location.type) {
      case 'Point':
        geoQuery = {
          location: {
            $near: {
              $geometry: user.location,
              $maxDistance: user.radius
            }
          }
        };
        break;
      case 'Polygon':
        geoQuery = {
          location: {
            $geoWithin: {
              $geometry: {
                type: user.location.type,
                coordinates: user.location.coordinates
              }
            }
          }
        };
        break;
      default:
        break;
    }

    if (geoQuery) {
      const personList = await PersonModel.find(geoQuery);
      res.status(200).send({ personList });
    } else {
      res.status(400).send({ error: 'no location data found for user' });
    }
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
    const orgsList = await UserModel.find()
      .sort({ status: 1 })
      .lean();

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
        { status: req.body.status }
      );

      // console.log(result);

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
