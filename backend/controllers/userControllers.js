const User  = require("../models/userModels.js");


const updateUserRole = async (req, res) => {
  try {
    const userId = req.user.id; // 👈 comes from auth middleware
    const { role } = req.body;

    if (!['student', 'teacher'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    res.status(200).json({
      message: `Role updated to ${role}`,
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        role: updatedUser.role,
      },
    });

  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {updateUserRole};