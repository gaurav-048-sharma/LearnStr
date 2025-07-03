const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5,
        maxlength: 30
    },
    name: {
        type: String,
        default: "",
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId; // Password is required ONLY if googleId is NOT present
        },
        minlength: 6
    },
    googleId: {
        type: String,
        sparse: true, // Still allows nulls to be excluded from index
        default: undefined // Avoid indexing null values entirely
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    }, { timestamps: true });

userSchema.pre('save', async function (next) {
    try {
      // Hash password if modified and no Google/Microsoft ID
      if (!this.googleId && this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log('✅ Password Hashed:', this.password);
      }
  
      next();
    } catch (error) {
      console.error('Pre-save error:', error);
      next(error);
    }
  });


const User = mongoose.model('User', userSchema);

module.exports = User;
