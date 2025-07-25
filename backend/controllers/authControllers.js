const User = require('../models/userModels.js');
const blacklistToken = require('../models/blackListToken.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library'); // Add Google Auth Library
const axios = require("axios");


const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // From .env
const client = new OAuth2Client(CLIENT_ID);

const register = async (req, res) => {
    try {
        const { username, name, email, password,role } = req.body;
        console.log('Received registration data:', { username, name, email });

        if (!username || !name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!['student', 'teacher'].includes(role)) {
              return res.status(400).json({ message: 'Role must be student or teacher' });
         }
        if (!email) return res.status(400).json({ error: "Email is required" });
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            return res.status(400).json({ error: "Only Gmail addresses (@gmail.com) are allowed" });
        }

        if (username.length < 5 || username.length > 30) {
            return res.status(400).json({ message: "Username must be 3-30 characters" });
 ` `       }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const existingUser = await User.findOne({$or: [{ username }, { email }]});
        if (existingUser) {
            return res.status(400).json({ message: 'Username  already exists' });
        }

        const newUser = new User({
            username,
            name,
            email,
            password ,
            role
        })
        await newUser.save();
        // Optionally, you can generate a JWT token for the user
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ message: 'User registered successfully', user: newUser,   token });
        console.log('User registered successfully:', newUser);
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
        
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        if (user.googleId) {
            return res.status(400).json({ message: "This account uses Google authentication. Please log in with Google." });
        }
        if (!user.password) {
            return res.status(400).json({ message: "No password set for this account" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
           console.log('Password mismatch for user:', password);
           console.log('Password mismatch for user:', user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ id: user._id , email: user.email}, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role
            }
            });
        console.log('User logged in successfully:', user, token);
    } catch (err) {
        //console.error('Login Error:', err);
        res.status(500).json({ error: "An error occurred during login" });
    }
};


const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const blacklistedToken = new blacklistToken({ token });
        await blacklistedToken.save();
        res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        //console.error('Logout Error:', err);
        res.status(400).json({ error: err.message });
    }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }

};

module.exports = {  
  getUser,
  login,
  register,
  logout
}


  // try {
  //   const { username } = req.params;
  //   const user = await User.findOne({ username });
  //   if (!user) {
  //     //console.log(`User not found: ${username}`);
  //     return res.status(404).json({ message: 'User not found' });
  //   }

  //   // const user = await UserProfile.findOne({ authId: auth._id });
  //   // if (!user) {
  //   //   //console.log(`User profile not found for authId: ${auth._id}`);
  //   //   return res.status(404).json({ message: 'User profile not found' });
  //   // }

  //   const responseData = {
  //     _id: user._id, // Include MongoDB ID
  //     userId: {
  //       username: user.username,
  //       name: user.name,
  //     },
  //   };
  //   //console.log(`Fetched user: ${username}`, responseData);
  //   res.status(200).json(responseData);
  // } catch (err) {
  //   //console.error('Get User Error:', err);
  //   res.status(500).json({ message: 'Server error' });
  // }
// module.exports.googleLogin = async (req, res) => {
//     try {
//         const { googleId, email, name } = req.body;
//         if (!googleId || !email || !name) {
//             return res.status(400).json({ message: "Google ID, email, and name are required" });
//         }
//         let user = await User.findOne({ googleId });
//         if (!user) {
//             user = new User({
//                 googleId,
//                 email,
//                 name,
//                 segregation: User.segregateUser(email)
//             });
//             await user.save();
//         }
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//         res.status(200).json({ message: 'Google login successful', user, token });
//     } catch (error) {
//         console.error('Error during Google login:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// const googleLogin = async (req, res) => {
//   try {
//     const { token } = req.body;

//     if (!token) {
//       return res.status(400).json({ message: 'Token is required' });
//     }

//     // Verify the Google ID token with Google servers
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const { email, name, sub: googleId } = payload;

//     if (!email) {
//       return res.status(400).json({ message: 'Email not found in Google payload' });
//     }

//     // Make a username (optional fallback)
//     const username = name ? name.replace(/\s+/g, '').toLowerCase() : email.split('@')[0];

//     // Check if user exists
//     let user = await User.findOne({ email });

//     if (!user) {
//       user = new User({
//         email,
//         name: name || username,
//         googleId,
//         username,
//       });
//       await user.save();
//     } else {
//       // If user exists but doesn't have googleId yet, attach it
//       if (!user.googleId) {
//         user.googleId = googleId;
//         await user.save();
//       }
//     }

//     // Generate JWT
//     const tokenJwt = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.status(200).json({ message: 'Google login successful', token: tokenJwt });
//   } catch (err) {
//     console.error('Google Login Error:', err);
//     res.status(500).json({ message: 'Google authentication failed', error: err.message });
//   }
// };
// module.exports.getUser = async (req, res) => {
//     try {
//         const user = await User.find().select("-password");
//         if(!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         res.status(200).json(user);
//         console.log("username",user.username)
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ error: "Failed to fetch users", details: error.message});
//     }
// }
// const getUser = async (req, res) => {

//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
  // try {
  //   const { username } = req.params;
  //   const user = await User.findOne({ username });
  //   if (!user) {
  //     //console.log(`User not found: ${username}`);
  //     return res.status(404).json({ message: 'User not found' });
  //   }

  //   // const user = await UserProfile.findOne({ authId: auth._id });
  //   // if (!user) {
  //   //   //console.log(`User profile not found for authId: ${auth._id}`);
  //   //   return res.status(404).json({ message: 'User profile not found' });
  //   // }

  //   const responseData = {
  //     _id: user._id, // Include MongoDB ID
  //     userId: {
  //       username: user.username,
  //       name: user.name,
  //     },
  //   };
  //   //console.log(`Fetched user: ${username}`, responseData);
  //   res.status(200).json(responseData);
  // } catch (err) {
  //   //console.error('Get User Error:', err);
  //   res.status(500).json({ message: 'Server error' });
  // }
//};

// module.exports.getUserProfile = async (req, res) => {
//       try {
//         const userId = req.params.id === 'me' ? req.user.userId : req.params.id;
//         const user = await User.findById(userId).select("-password");
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         res.status(200).json(user);
//         console.log('User profile fetched successfully:', user.username);
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ error: "Failed to fetch user", details: error.message });
//     }
//     // try {
//     //     const user = await User.find().select("-password");
//     //     if(!user) {
//     //         return res.status(404).json({ error: "User not found" });
//     //     }

//     //     res.status(200).json(user);
//     // } catch (error) {
//     //     console.error(error);
//     //     res.status(400).json({ error: "Failed to fetch users", details: error.message});
//     // }
// }

