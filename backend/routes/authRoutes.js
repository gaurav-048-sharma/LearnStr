const express = require('express');
const router = express.Router();
const { register, login, getUser, logout, getUserProfile } = require('../controllers/authControllers.js');
const checkBlacklist = require('../middlewares/checkBlackListToken.js');
const passport = require('passport');
const authMiddleware = require("../middlewares/authMiddleware.js");
const jwt = require('jsonwebtoken');
require('../config/passport.js');

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));    
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Here `req.user` is set by your strategy
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    // Send it as redirect or JSON
    res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
  }
);



// router.post("/google-login", googleLogin);
router.get('/profile', authMiddleware, getUser);
// router.get('/profile/:username', authMiddleware, getUserProfile);
router.post('/register', register);
router.post('/login', login);

router.post('/logout', checkBlacklist, logout);

module.exports = router;

