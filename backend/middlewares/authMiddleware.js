const User = require('../models/userModels.js');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
      const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'No token provided or invalid format' });
    }
console.log(authHeader)
     const token = authHeader.split(" ")[1];
     console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    console.log(req.headers);

    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
