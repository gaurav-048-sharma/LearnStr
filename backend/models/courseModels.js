// models/Course.js

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lessons: [
      {
        title: {
          type: String,
          required: true,
        },
        videoURL: {
          type: String,
          required: true,
        },
        public_id: { type: String },
        duration: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true } // createdAt & updatedAt automatically
);

module.exports = mongoose.model('Course', courseSchema);
