// routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseControllers.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const { requireRole } = require('../middlewares/roleMiddleware.js');

// Multer upload
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📌 TEACHER routes
router.post(
  '/',
  authMiddleware,
  requireRole('teacher'),
  upload.array('videos'), // Field name must match your frontend
  courseController.createCourse
);

router.put(
  '/:id',
  authMiddleware,
  requireRole('teacher'),
  upload.array('videos'), // Optional updated videos
  courseController.updateCourse
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole('teacher'),
  courseController.deleteCourse
);

router.get('/teacher/:teacherId', courseController.getCoursesByTeacherId);

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
