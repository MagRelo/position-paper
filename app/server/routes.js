var express = require('express');
var router = express.Router();

const path = require('path');
const fs = require('fs');

const LinkModel = require('./models').LinkModel;

//
// MISC
//

router.get('/link/:linkId', function(req, res) {
  // get index page and replace meta values
  const filePath = path.resolve(__dirname, '../build', 'index.html');
  fs.readFile(filePath, 'utf8', async function(err, data) {
    if (err) {
      res.sendFile('index.html', { root: './build' });
    }

    // get link
    const link = await LinkModel.findOne({
      linkId: req.params.linkId
    });
    if (!link) return res.status(404).send({ error: 'not found' });

    data = data.replace(
      /\$OG_TITLE/g,
      link.data.jobTitle + ' – ' + link.data.employer
    );
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      `Apply now and get ${link.target_bonus} when you get the job, OR promote this position and collect up to ${link.network_bonus} if the candidate applies through your link.`
    );
    const result = data.replace(
      /\$OG_IMAGE/g,
      'https://' + req.hostname + '/logo.png'
    );
    res.send(result);
  });
});

// serve the frontend for all non-api requests
router.get('*', function(req, res) {
  // base route
  console.log('base route');

  // get index page and replace meta values
  const filePath = path.resolve(__dirname, '../build', 'index.html');
  fs.readFile(filePath, 'utf8', async function(err, data) {
    if (err) {
      console.log('index not found - fallback...');
      res.sendFile('index.html', { root: './build' });
    }

    // replace values
    data = data.replace(/\$OG_TITLE/g, 'Talent Relay');
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      `Talent Relay super-charges your talent search. We combine cash incentives, social networking, and human judgement to provide a steady stream of high-quality, pre-screened candidates`
    );
    const result = data.replace(
      /\$OG_IMAGE/g,
      'https://' + req.hostname + '/logo.png'
    );

    console.log(result);
    res.send(result);
  });
});

// serve the frontend for all non-api requests
// router.get('/*', function(req, res) {
//   console.log('base route visited.');
//   res.sendFile('index.html', { root: './build' });
// });

// // search
// router.get('/search', getToken, getUser, async function(req, res) {
//   try {
//     const results = await LinkModel.find({
//       isBuried: false
//     })
//       .populate('user')
//       .then(linkArray => {
//         return linkArray.map(link => {
//           let responseObj = {
//             link: {
//               _id: link._id,
//               linkId: link.linkId,
//               postedBy: link.user.name,
//               userId: link.user._id,
//               createdAt: link.createdAt,
//               respondBonus: link.target_bonus,
//               promoteBonus: link.potentialPayoffs[link.generation + 1]
//             },
//             query: {
//               _id: null,
//               title: link.title,
//               bonus: link.bonus,
//               type: link.type,
//               data: link.data
//             }
//           };

//           // not logged in
//           if (!req.user) {
//             responseObj.user = {
//               isFollowingLink: false,
//               isFollowingUser: false,
//               isQueryOwner: false,
//               isLinkOwner: false,
//               isLoggedIn: false
//             };
//             return responseObj;
//           }

//           // logged in
//           responseObj.user = {
//             isFollowingLink:
//               req.user && req.user.follows.indexOf(link._id) > -1,
//             isFollowingUser:
//               req.user && req.user.follows.indexOf(link.user._id) > -1,
//             isQueryOwner: false,
//             isLinkOwner: req.user._id.equals(link.user._id),
//             isLoggedIn: true
//           };

//           return responseObj;
//         });
//       });

//     res.status(200).send(results);
//   } catch (error) {
//     console.log(req.path, error);
//     res.status(500).send(error);
//   }
// });

// router.post('/alpha', async function(req, res) {
//   const newUser = new AlphaModel(req.body);
//   await newUser.save();
//   res.status(200).send();
// });

// router.get('/admin', getToken, authenticate, getUser, getAllData);

// //
// // AUTH
// router.post('/auth/linkedin/callback', linkedinAuth, sendToken);
// router.get('/auth/status', getToken, authenticate, getUser, userStatus);

// //
// // USER
// //

// // get user
// router.get('/user', getToken, authenticate, getUser, populateUser);
// router.post('/user/follow', getToken, authenticate, getUser, updateFollow);
// router.get('/user/friends', getToken, authenticate, getUser, getUserFriends);
// router.post('/user/tweet', getToken, authenticate, getUser, sendTweet);
// router.post('/user/email', getToken, authenticate, getUser, sendEmail);
// router.post('/user/account', getToken, authenticate, getUser, addAccount);

// //
// // LINK
// //

// router.post('/query/add', getToken, authenticate, getUser, createQuery);
// router.get('/link/:linkId', getToken, getUser, getLink);
// router.post('/link/add', getToken, authenticate, getUser, createChildLink);

// //
// // RESPONSE
// //

// // create response
// router.post('/response/add', getToken, authenticate, getUser, createResponse);

// // get response
// router.get(
//   '/response/:responseId',
//   getToken,
//   authenticate,
//   getUser,
//   getResponse
// );

// // close response (create payment)
// router.put(
//   '/response/:responseId',
//   getToken,
//   authenticate,
//   getUser,
//   closeResponse
// );

module.exports = router;
