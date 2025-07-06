// const BlacklistToken = require("../models/blackListToken.js");

// const checkBlacklist = async (req, res, next) => {
//     const token = req.headers.authorization.split(" ")[1];
  
//     const blacklistedToken = await BlacklistToken.findOne({ token });
//     if (blacklistedToken) {
//       return res.status(401).json({ error: 'Token is blacklisted' });
//     }
  
//     next();
// };
  
// module.exports = checkBlacklist; 
const BlacklistToken = require("../models/blackListToken.js");

const checkBlacklist = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No valid authorization header provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const blacklistedToken = await BlacklistToken.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ error: "Token is blacklisted" });
    }

    next();
  } catch (err) {
    console.error("Error checking blacklist:", err);
    res.status(500).json({ error: "Server error while checking token" });
  }
};

module.exports = checkBlacklist;
