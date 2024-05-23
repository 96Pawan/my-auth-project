const express = require('express');
const router = express.Router();
const User = require('../models/User');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send('Not authenticated');
  }
}

function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    res.status(403).send('Not authorized');
  }
}

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and profile endpoints
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get the logged-in user's profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Not authenticated
 */
router.get('/profile', isAuthenticated, (req, res) => {
  res.json(req.user);
});

/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update the logged-in user's profile
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: User profile updated successfully
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Server error
 */
router.put('/profile', isAuthenticated, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /users/user/{id}:
 *   get:
 *     summary: Get a specific user's profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized to view this profile
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/user/:id', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    if (user.isPublic || req.user.role === 'admin') {
      res.json(user);
    } else {
      res.status(403).send('Not authorized to view this profile');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /users/public:
 *   get:
 *     summary: Get all public profiles
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Public profiles retrieved successfully
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Server error
 */
router.get('/public', isAuthenticated, async (req, res) => {
  try {
    const users = await User.find({ isPublic: true });
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all user profiles (admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profiles retrieved successfully
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.get('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;