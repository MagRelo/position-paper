var express = require('express');
var router = express.Router();

const passport = require('passport');

//
// AUTH
router.post('/login', passport.authenticate('magic'), (req, res) => {
  return res.status(200).send(req.user);
});

router.get('/status', (req, res) => {
  const auth = req.isAuthenticated();
  console.log('status', auth);

  if (req.isAuthenticated()) {
    return res.status(200).send(req.user);
  } else {
    return res.status(404).send('Not Authenticated');
  }
});

module.exports = router;
