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

// const uploadVideoToCloudinary = (file) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { resource_type: 'video', folder: 'learnstream/videos' },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result.secure_url);
//       }
//     );
//     stream.end(file.buffer);
//   });
// };

// const streamifier = require('streamifier');

// const uploadVideoToCloudinary = (file) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       {
//         resource_type: 'video',
//         folder: 'learnstream/videos',
//         public_id: file.originalname.split('.')[0], // optional: name by file name
//       },
//       (error, result) => {
//         if (error) {
//           console.error('Cloudinary upload error:', error);
//           reject(error);
//         } else {
//           resolve({
//             secure_url: result.secure_url,
//             public_id: result.public_id,
//           });
//         }
//       }
//     );

//     streamifier.createReadStream(file.buffer).pipe(stream);
//   });
// };
const uploadVideoToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'video', folder: 'learnstream/videos' },
      (error, result) => {
        if (error) reject(error);
        else resolve({
          secure_url: result.secure_url,
          public_id: result.public_id
        });
      }
    );
    stream.end(file.buffer);
  });
};


// Create Course (already defined, refined here)
// const createCourse = async (req, res) => {
//   const { title, description } = req.body;
  
//   const files = req.files;

//   try {
//     const user = await User.findById(req.user.id);
//     if (user.role !== 'teacher') {
//       return res.status(403).json({ message: 'Only teachers can create courses' });
//     }

//     const lessons = [];
//     if (files && files.length > 0) {
//       for (const file of files) {
//         const videoURL = await uploadVideoToCloudinary(file);
//         lessons.push({
//           title: file.originalname.split('.')[0],
//           videoURL,
//         });
//       }
//     }

//     const course = new Course({
//       title,
//       description,
//       teacher: req.user._id,
      
//       lessons,
//     });

//     await course.save();
//     res.status(201).json(course);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

const createCourse = async (req, res) => {
  const { title, description } = req.body;
  const files = req.files; // Multiple video files
  const lessons = [];

  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers can create courses' });
    }

    if (files && files.length > 0) {
      // for (const file of files) {
      //   const result = await uploadVideoToCloudinary(file.buffer, file.originalname);
      //   lessons.push({
      //     title: file.originalname.split('.')[0],
      //     videoURL: result.secure_url,
      //     public_id: result.public_id,
      //   });
      // }
      for (const file of files) {
         const { secure_url, public_id } = await uploadVideoToCloudinary(file);

        lessons.push({
          title: file.originalname?.split('.')[0] || 'Untitled',
          videoURL: secure_url,
          public_id,
        });
      }

    }

    const course = new Course({
      title,
      description,
      teacher: req.user._id,
      lessons,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Server error' });
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
// const updateCourse = async (req, res) => {
//   const { id } = req.params;
//   const { title, description } = req.body;

//   try {
//     const course = await Course.findById(id);
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }

//     // Check if the user is the instructor
//     if (course.teacher.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     // Update fields
//     course.title = title || course.title;
//     course.description = description || course.description;

//     // Handle video uploads if provided
//     if (req.files && req.files.videos) {
//       const videos = Array.isArray(req.files.videos) ? req.files.videos : [req.files.videos];
//       const uploadedVideos = await Promise.all(
//         videos.map(async (video) => {
//           const result = await cloudinary.uploader.upload(video.path, {
//             resource_type: 'video',
//             folder: 'learnstream_videos',
//           });
//           return {
//             title: video.originalname.split('.')[0],
//             videoURL: result.secure_url,
//           };
//         })
//       );
//       course.lessons = [...course.lessons, ...uploadedVideos];
//     }

//     const updatedCourse = await course.save();
//     res.json(updatedCourse);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, updatedLessons } = req.body;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check authorization
    if (course.teacher.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update course info
    if (title) course.title = title;
    if (description) course.description = description;

    // === Update existing lessons if provided ===
    if (updatedLessons) {
      const parsedLessons = typeof updatedLessons === 'string'
        ? JSON.parse(updatedLessons)
        : updatedLessons;

      course.lessons = course.lessons.map((lesson) => {
        const updated = parsedLessons.find(l => l._id === lesson._id.toString());
        if (updated) {
          return {
            ...lesson.toObject(),
            title: updated.title || lesson.title,
            videoURL: updated.videoURL || lesson.videoURL, // fallback to existing video
          };
        }
        return lesson;
      });
    }

    // === Upload new video files (add new lessons) ===
    if (req.files && req.files.length > 0) {
      const uploadedVideos = await Promise.all(
        req.files.map(async (file) => {
          // const videoURL = await uploadVideoToCloudinary(file);
          // return {
          //   title: file.originalname.split('.')[0],
          //   videoURL,
          // };
          const result = await uploadVideoToCloudinary(file);
          return {
            title: file.originalname.split('.')[0],
            videoURL: result.secure_url,
            public_id: result.public_id,
          };

        })
      );

      course.lessons.push(...uploadedVideos);
    }

    const updatedCourse = await course.save();
    return res.json(updatedCourse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCoursesByTeacherId = async (req, res) => {
    try {
    const teacherId = req.user._id; // From JWT middleware

    const courses = await Course.find({ teacher: teacherId }).populate('teacher', 'name email');

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching teacher courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
  // try {
  //   const teacherId = req.params.teacherId;

  //   const courses = await Course.find({ teacher: teacherId }).populate('teacher', 'name email');

  //   if (!courses || courses.length === 0) {
  //     return res.status(404).json({ message: 'No courses found for this teacher.' });
  //   }

  //   res.status(200).json(courses);
  // } catch (error) {
  //   console.error('Error fetching courses by teacher ID:', error);
  //   res.status(500).json({ message: 'Server error' });
  // }
};

const getCourseByIdForTeacher = async (req, res) => {
  try {
    const courseId = req.params.id;
    const teacherId = req.user._id;

    //console.log("Fetching course with ID:", courseId, "for teacher:", teacherId);

    const course = await Course.findOne({ _id: courseId, teacher: teacherId }).populate("teacher");

    if (!course) {
      return res.status(404).json({ message: "Course not found or unauthorized" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Course
// const deleteCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ message: 'Course not found' });

//     if (course.teacher.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     await course.remove();
//     res.json({ message: 'Course deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// const deleteCourse = async (req, res) => {
//   const courseId = req.params.id;
//   const teacherId = req.user._id;

//   try {
//     const course = await Course.findOne({ _id: courseId, teacher: teacherId });

//     if (!course) {
//       return res.status(404).json({ message: 'Course not found or unauthorized' });
//     }

//     await course.deleteOne(); // or use `await Course.deleteOne({ _id: courseId })`
//     res.status(200).json({ message: 'Course deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting course:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  const teacherId = req.user._id;

  try {
    const course = await Course.findOne({ _id: courseId, teacher: teacherId });
    if (!course) return res.status(404).json({ message: 'Course not found or unauthorized' });

    // Delete each video from Cloudinary
    for (const lesson of course.lessons) {
      if (lesson.public_id) {
        await cloudinary.uploader.destroy(lesson.public_id, {
          resource_type: 'video'
        });
      }
    }

    await course.deleteOne();
    res.json({ message: 'Course and videos deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { createCourse, getAllCourses, getCourseById,
   getCoursesByTeacherId, getCourseByIdForTeacher, updateCourse, deleteCourse };