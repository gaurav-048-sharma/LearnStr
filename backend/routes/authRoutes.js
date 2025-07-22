const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers.js');
//const updateUserRole = require("../controllers/userControllers.js")
const checkBlacklist = require('../middlewares/checkBlackListToken.js');
const passport = require('passport');
const authMiddleware = require("../middlewares/authMiddleware.js");
const jwt = require('jsonwebtoken');
//const protectMiddleware = require("../middlewares/protectMiddleware.js")
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
// const { getUser } = require('../controllers/authControllers.js');

// router.get('/profile', authMiddleware, getUser);


// router.post("/google-login", googleLogin);

// router.get('/profile/:username', authMiddleware, getUserProfile);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', checkBlacklist, authController.logout);
router.get('/profile', authMiddleware, authController.getUser);
// router.patch("/update-role",protectMiddleware, updateUserRole.updateUserRole )
module.exports = router;

