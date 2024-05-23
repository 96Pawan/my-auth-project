const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

console.log('authRoutes.js is loaded');

router.post('/register', (req, res) => {
  console.log('/register endpoint hit');
  const { username, email, password, isPublic, profileDetails } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    const newUser = new User({ username, email, password: hash, isPublic, profileDetails });
    newUser.save()
      .then(user => res.status(201).send(user))
      .catch(err => res.status(500).send(err));
  });
});

router.post('/login', (req, res, next) => {
  console.log('/login endpoint hit');
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).send(info.message);
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.send('Logged in');
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  console.log('/logout endpoint hit');
  req.logout();
  res.send('Logged out');
});

module.exports = router;


// const express = require('express');
// const passport = require('passport');
// const bcrypt = require('bcrypt');
// const User = require('../models/User');
// const router = express.Router();

// router.post('/register', (req, res) => {
//   const { username, email, password, isPublic } = req.body;
//   bcrypt.hash(password, 10, (err, hash) => {
//     if (err) throw err;
//     new User({ username, email, password: hash, isPublic }).save()
//       .then(user => res.status(201).send(user))
//       .catch(err => res.status(500).send(err));
//   });
// });

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   res.send('Logged in');
// });

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.send('Logged out');
// });

// module.exports = router;


// const express = require('express');
// const passport = require('passport');
// const bcrypt = require('bcrypt');
// const User = require('../models/User');
// const router = express.Router();

// router.post('/register', (req, res) => {
//   const { username, email, password, isPublic } = req.body;
//   bcrypt.hash(password, 10, (err, hash) => {
//     if (err) throw err;
//     new User({ username, email, password: hash, isPublic }).save()
//       .then(user => res.status(201).send(user))
//       .catch(err => res.status(500).send(err));
//   });
// });

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   res.send('Logged in');
// });

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.send('Logged out');
// });

// module.exports = router;
