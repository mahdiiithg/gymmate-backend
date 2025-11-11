const express = require('express');
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  completeWorkout
} = require('../controllers/workoutController');
const { protect } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');
const { objectIdValidation, workoutValidation } = require('../middleware/validation');

const router = express.Router();

router.route('/')
  .get(apiLimiter, protect, getWorkouts)
  .post(apiLimiter, protect, workoutValidation, createWorkout);

router.route('/:id')
  .get(apiLimiter, protect, objectIdValidation, getWorkout)
  .put(apiLimiter, protect, objectIdValidation, updateWorkout)
  .delete(apiLimiter, protect, objectIdValidation, deleteWorkout);

router.put('/:id/complete', apiLimiter, protect, objectIdValidation, completeWorkout);

module.exports = router;
