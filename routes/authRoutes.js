const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *               profileDetails:
 *                 type: object
 *                 properties:
 *                   photo:
 *                     type: string
 *                   name:
 *                     type: string
 *                   bio:
 *                     type: string
 *                   phone:
 *                     type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Server error
 */
router.post('/register', async (req, res) => {
  console.log('/register endpoint hit');
  const { username, email, password, isPublic, profileDetails } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({ username, email, password: hashedPassword, isPublic, profileDetails });
    await user.save();

    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid username or password
 *       500:
 *         description: Server error
 */
router.post('/login', (req, res, next) => {
  console.log('/login endpoint hit');
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return next(err);
    }
    if (!user) {
      console.log('User not found or password incorrect:', info.message);
      return res.status(400).send(info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Session login error:', err);
        return next(err);
      }
      console.log('Login successful:', user.username);
      return res.send('Logged in successfully');
    });
  })(req, res, next);
});

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Log out the current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.get('/logout', (req, res) => {
  console.log('/logout endpoint hit');
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Failed to log out');
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
        return res.status(500).send('Failed to destroy session');
      }
      res.send('Logged out');
    });
  });
});

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Authenticate with Google
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google for authentication
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google authentication callback
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to /dashboard on successful authentication
 *       401:
 *         description: Authentication failed
 */
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router;