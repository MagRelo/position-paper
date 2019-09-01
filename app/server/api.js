var express = require('express');
var router = express.Router();

const passport = require('passport');
const scrape = require('html-metadata');

// Controllers

const {
  twitterReverse,
  twitterAuth,
  sendToken,
  getToken,
  authenticate,
  userStatus,
  getUser
} = require('./controllers/auth');

const {
  populateUser,
  updateFollow,
  getUserFriends,
  sendTweet,
  sendEmail,
  addAccount
} = require('./controllers/user');
const { createQuery, getLink, createChildLink } = require('./controllers/link');
const {
  createResponse,
  getResponse,
  closeResponse
} = require('./controllers/response');

const LinkModel = require('./models').LinkModel;

//
// MISC
//

// search
router.get('/search', getToken, getUser, async function(req, res) {
  try {
    const results = await LinkModel.find({
      isBuried: false
    })
      .populate('user')
      .then(linkArray => {
        return linkArray.map(link => {
          let responseObj = {
            link: {
              _id: link._id,
              linkId: link.linkId,
              postedBy: link.user.name,
              userId: link.user._id,
              createdAt: link.createdAt,
              respondBonus: link.target_bonus,
              promoteBonus: link.potentialPayoffs[link.generation + 1]
            },
            query: {
              _id: null,
              title: link.title,
              bonus: link.bonus,
              type: link.type,
              data: link.data
            }
          };

          // not logged in
          if (!req.user) {
            responseObj.user = {
              isFollowingLink: false,
              isFollowingUser: false,
              isQueryOwner: false,
              isLinkOwner: false,
              isLoggedIn: false
            };
            return responseObj;
          }

          // logged in
          responseObj.user = {
            isFollowingLink:
              req.user && req.user.follows.indexOf(link._id) > -1,
            isFollowingUser:
              req.user && req.user.follows.indexOf(link.user._id) > -1,
            isQueryOwner: false,
            isLinkOwner: req.user._id.equals(link.user._id),
            isLoggedIn: true
          };

          return responseObj;
        });
      });

    res.status(200).send(results);
  } catch (error) {
    console.log(req.path, error);
    res.status(500).send(error);
  }
});

router.post('/query/metadata', async function(req, res) {
  if (!req.body.url) {
    return res.status(400).send({ error: 'bad request' });
  }

  try {
    const metadata = await scrape(req.body.url);

    const salary = `$${metadata.jsonLd.baseSalary.value.minValue} – $${
      metadata.jsonLd.baseSalary.value.maxValue
    }`;
    const location = `${
      metadata.jsonLd.jobLocation[0].address.addressLocality
    }, ${metadata.jsonLd.jobLocation[0].address.addressRegion}`;
    // const description = `$${metadata.jsonLd.description}`;

    const formatted = {
      title: metadata.jsonLd.title,
      salary: salary,
      location: location,
      hiringOrganization: metadata.jsonLd.hiringOrganization.name,
      skills: metadata.jsonLd.skills,
      maxSalary: metadata.jsonLd.baseSalary.value.maxValue,
      minSalary: metadata.jsonLd.baseSalary.value.minValue,
      jobData: metadata.jsonLd
    };

    res.status(200).send(formatted);
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).send(error);
  }
});

//
// AUTH
//
router.post('/auth/twitter/reverse', twitterReverse);
router.post(
  '/auth/twitter',
  twitterAuth,
  passport.authenticate('twitter-token'),
  sendToken
);
router.get('/auth/status', getToken, authenticate, getUser, userStatus);

//
// USER
//

// get user
router.get('/user', getToken, authenticate, getUser, populateUser);
router.post('/user/follow', getToken, authenticate, getUser, updateFollow);
router.get('/user/friends', getToken, authenticate, getUser, getUserFriends);
router.post('/user/tweet', getToken, authenticate, getUser, sendTweet);
router.post('/user/email', getToken, authenticate, getUser, sendEmail);
router.post('/user/account', getToken, authenticate, getUser, addAccount);

//
// LINK
//

router.post('/query/add', getToken, authenticate, getUser, createQuery);
router.get('/link/:linkId', getToken, getUser, getLink);
router.post('/link/add', getToken, authenticate, getUser, createChildLink);

//
// RESPONSE
//

// create response
router.post('/response/add', getToken, authenticate, getUser, createResponse);

// get response
router.get(
  '/response/:responseId',
  getToken,
  authenticate,
  getUser,
  getResponse
);

// close response (create payment)
router.put(
  '/response/:responseId',
  getToken,
  authenticate,
  getUser,
  closeResponse
);

module.exports = router;
