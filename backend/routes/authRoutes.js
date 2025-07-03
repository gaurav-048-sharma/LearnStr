const express = require('express');
const router = express.Router();
const { register, login, googleLogin, logout } = require('../controllers/authControllers.js');
const checkBlacklist = require('../middlewares/checkBlackListToken.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport.js');

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));    
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// router.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     const token = jwt.sign(
//       { id: req.user._id, email: req.user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     // ✅ Redirect to your frontend with the token in query params
//     res.redirect(`http://localhost:5173/dashboard?token=${token}`);
//   }
// );
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Here `req.user` is set by your strategy
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    // Send it as redirect or JSON
    res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
  }
);


// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//     res.redirect(`/dashboard?token=${token}`);
// });
// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     const token = jwt.sign(
//       { id: req.user._id, email: req.user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );
//     res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
//   }
// );


// router.post("/google-login", googleLogin);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', checkBlacklist, logout);

module.exports = router;

