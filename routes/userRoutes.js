const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send('Not authenticated');
  }
}

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    res.status(403).send('Not authorized');
  }
}

// Get logged-in user's profile
router.get('/profile', isAuthenticated, (req, res) => {
  res.json(req.user);
});

// Update profile details
router.put('/profile', isAuthenticated, (req, res) => {
  const updates = req.body;
  User.findByIdAndUpdate(req.user._id, updates, { new: true }, (err, user) => {
    if (err) return res.status(500).send(err);
    res.json(user);
  });
});

// Get a specific user's profile
router.get('/user/:id', isAuthenticated, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('User not found');
    if (user.isPublic || req.user.role === 'admin') {
      res.json(user);
    } else {
      res.status(403).send('Not authorized to view this profile');
    }
  });
});

// Get all public profiles
router.get('/users/public', isAuthenticated, (req, res) => {
  User.find({ isPublic: true }, (err, users) => {
    if (err) return res.status(500).send(err);
    res.json(users);
  });
});

// Admin can view all profiles
router.get('/users', isAuthenticated, isAdmin, (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send(err);
    res.json(users);
  });
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// // Middleware to check if the user is authenticated
// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.status(401).send('Not authenticated');
//   }
// }

// // Middleware to check if the user is an admin
// function isAdmin(req, res, next) {
//   if (req.user && req.user.role === 'admin') {
//     return next();
//   } else {
//     res.status(403).send('Not authorized');
//   }
// }

// // Get logged-in user's profile
// router.get('/profile', isAuthenticated, (req, res) => {
//   res.json(req.user);
// });

// // Update profile details
// router.put('/profile', isAuthenticated, (req, res) => {
//   const updates = req.body;
//   User.findByIdAndUpdate(req.user._id, updates, { new: true }, (err, user) => {
//     if (err) return res.status(500).send(err);
//     res.json(user);
//   });
// });

// // Get a specific user's profile
// router.get('/user/:id', isAuthenticated, (req, res) => {
//   User.findById(req.params.id, (err, user) => {
//     if (err) return res.status(500).send(err);
//     if (!user) return res.status(404).send('User not found');
//     if (user.isPublic || req.user.role === 'admin') {
//       res.json(user);
//     } else {
//       res.status(403).send('Not authorized to view this profile');
//     }
//   });
// });

// // Get all public profiles
// router.get('/users/public', isAuthenticated, (req, res) => {
//   User.find({ isPublic: true }, (err, users) => {
//     if (err) return res.status(500).send(err);
//     res.json(users);
//   });
// });

// // Admin can view all profiles
// router.get('/users', isAuthenticated, isAdmin, (req, res) => {
//   User.find({}, (err, users) => {
//     if (err) return res.status(500).send(err);
//     res.json(users);
//   });
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// router.get('/profile', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json(req.user);
//   } else {
//     res.status(401).send('Not authenticated');
//   }
// });

// router.get('/user/:id', (req, res) => {
//   if (req.user && req.user.role === 'admin') {
//     User.findById(req.params.id, (err, user) => {
//       if (err) return res.status(500).send(err);
//       if (!user) return res.status(404).send('User not found');
//       res.json(user);
//     });
//   } else {
//     res.status(403).send('Not authorized');
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// router.get('/profile', (req, res) => {
//     if (req.isAuthenticated()) {
//       res.json(req.user);
//     } else {
//       res.status(401).send('Not authenticated');
//     }
//   });
  
//   router.get('/user/:id', (req, res) => {
//     if (req.user && req.user.role === 'admin') {
//       User.findById(req.params.id, (err, user) => {
//         if (err) return res.status(500).send(err);
//         if (!user) return res.status(404).send('User not found');
//         res.json(user);
//       });
//     } else {
//       res.status(403).send('Not authorized');
//     }
//   });
  
//   module.exports = router;
  