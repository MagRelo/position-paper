var express = require('express');
var router = express.Router();

const passport = require('passport');

//
// AUTH
router.post('/login', passport.authenticate('magic'), (req, res) => {
  return res.status(200).send(req.user);
});

//
// USER
//
router.get('/user', (req, res) => {
  console.log('auth?', req.isAuthenticated());
});

module.exports = router;
