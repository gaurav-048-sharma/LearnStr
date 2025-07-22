const jwt = require("jsonwebtoken");
const User = require("../models/userModels.js");

const protectMiddleware = async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password'); // select excludes 'password'
      next();
    } else {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = protectMiddleware;
