var express = require('express');
var router = express.Router();

const passport = require('passport');
const magicLogout = require('./controllers/magic-auth').logout;
//
// AUTH
router.post('/login', passport.authenticate('magic'), (req, res) => {
  return res.status(200).send(req.user);
});

router.post('/logout', async (req, res) => {
  if (req.isAuthenticated()) {
    await magicLogout(req.user.issuer);
    req.logout();
    return res.status(200).end();
  } else {
    return res.status(401).end(`User is not logged in.`);
  }
});

router.get('/status', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send({ error: 'Not Authenticated' });
  }
  return res.status(200).send(req.user);
});

// function authenticate(req, res, next) {

//   next();
// }

module.exports = router;
