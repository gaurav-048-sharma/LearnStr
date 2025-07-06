const jwt = require("jsonwebtoken")
const User = require("../models/userModels.js");

const protectMiddleware = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(401).json({ message: 'Not authorized, no token' });
        }
        if(req.headers.authorization && req.headers.authorization.startswith('Bearer')) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select(-password);
            next();
        }

    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized' });
    }

}

module.exports = protectMiddleware;