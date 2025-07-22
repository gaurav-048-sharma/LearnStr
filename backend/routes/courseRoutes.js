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
  '/courses',
  authMiddleware,
  requireRole('teacher'),
  upload.array('videos'), // Field name must match your frontend
  courseController.createCourse
);

router.put(
  '/courses/:id',
  authMiddleware,
  requireRole('teacher'),
  upload.array('videos'), // Optional updated videos
  courseController.updateCourse
);

router.delete(
  '/courses/:id',
  authMiddleware,
  requireRole('teacher'),
  courseController.deleteCourse
);

// 📌 STUDENT routes
router.get(
  '/courses',
  authMiddleware,
  requireRole('student'),
  courseController.getAllCourses
);

router.get(
  '/courses/:id',
  authMiddleware,
  requireRole('student'),
  courseController.getCourseById
);

module.exports = router;
