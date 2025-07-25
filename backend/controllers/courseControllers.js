const Course = require("../models/courseModels.js");
const cloudinary = require('../config/cloudinary.js');
const User = require("../models/userModels.js")


// const uploadVideoToCloudinary = (file) => {
//     return new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { resource_type: 'video', folder: 'learnstream/videos' },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result.secure_url); // Return the HLS URL
//         }
//       );
//       stream.end(file.buffer);
//     });
//   };

const uploadVideoToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'video', folder: 'learnstream/videos' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(file.buffer);
  });
};

// Create Course (already defined, refined here)
const createCourse = async (req, res) => {
  const { title, description } = req.body;
  const files = req.files;

  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers can create courses' });
    }

    const lessons = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const videoURL = await uploadVideoToCloudinary(file);
        lessons.push({
          title: file.originalname.split('.')[0],
          videoURL,
        });
      }
    }

    const course = new Course({
      title,
      description,
      teacher: req.user.id,
      lessons,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Read All Courses (already defined)
// const getAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.find().populate('instructor', 'name email');
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher', 'name email _id');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Read Single Course (already defined)
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacher', 'name email');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Course (add or replace videos)
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the user is the instructor
    if (course.teacher.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update fields
    course.title = title || course.title;
    course.description = description || course.description;

    // Handle video uploads if provided
    if (req.files && req.files.videos) {
      const videos = Array.isArray(req.files.videos) ? req.files.videos : [req.files.videos];
      const uploadedVideos = await Promise.all(
        videos.map(async (video) => {
          const result = await cloudinary.uploader.upload(video.path, {
            resource_type: 'video',
            folder: 'learnstream_videos',
          });
          return {
            title: video.originalname.split('.')[0],
            videoURL: result.secure_url,
          };
        })
      );
      course.lessons = [...course.lessons, ...uploadedVideos];
    }

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Delete Course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (course.teacher.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await course.remove();
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse };