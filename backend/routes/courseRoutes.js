// routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseControllers.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const { requireRole } = require('../middlewares/roleMiddleware.js');

// Multer upload
const multer = require('multer');
const protectMiddleware = require('../middlewares/protectMiddleware.js');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📌 TEACHER routes
router.post(
  '/',
  authMiddleware,
  requireRole('teacher'),
  upload.array('videos', 10), // Field name must match your frontend
  courseController.createCourse
);

// router.put(
//   '/:id',
//   authMiddleware,
//   requireRole('teacher'),
//   upload.array('videos'), // Optional updated videos
//   courseController.updateCourse
// );
router.put(
  '/update/:id',
  authMiddleware,
  requireRole('teacher'),
  upload.array('videos', 10), // multiple video uploads
  courseController.updateCourse
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole('teacher'), // ensures user has teacher role
  courseController.deleteCourse
);

router.get('/teacher',protectMiddleware, courseController.getCoursesByTeacherId);
router.get('/teacher/:id', protectMiddleware, courseController.getCourseByIdForTeacher);

// 📌 STUDENT routes
router.get(
  '/',
  authMiddleware,
  // requireRole('student'),
  courseController.getAllCourses
);

router.get(
  '/:id',
  authMiddleware,
  // requireRole('student'),
  courseController.getCourseById
);

module.exports = router;
