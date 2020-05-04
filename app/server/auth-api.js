var express = require('express');
var router = express.Router();

const passport = require('passport');
const logout = require('./controllers/magic-auth').logout;
//
// AUTH
router.post('/login', passport.authenticate('magic'), (req, res) => {
  return res.status(200).send(req.user);
});

router.post('/logout', async (req, res) => {
  if (req.isAuthenticated()) {
    // logout of magic
    await logout(req.user.issuer);

    // logout session
    req.logout();
    return res.status(200).end();
  } else {
    return res.status(401).end(`User is not logged in.`);
  }
});

router.get('/status', (req, res) => {
  const auth = req.isAuthenticated();

  console.log('status', auth);

  if (req.isAuthenticated()) {
    return res.status(200).send(req.user);
  } else {
    return res.status(401).send('Not Authenticated');
  }
});

module.exports = router;
