const User  = require("../models/userModels.js");


module.exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.find().select("-password");
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
        console.log(user.username)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Failed to fetch users", details: error.message});
    }
}