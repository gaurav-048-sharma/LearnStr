// middlewares/roleMiddleware.js

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: `Access denied: ${role} role required` });
    }
    next();
  };
};
