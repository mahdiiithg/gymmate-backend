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

const router = express.Router();

router.route('/')
  .get(apiLimiter, protect, getWorkouts)
  .post(apiLimiter, protect, createWorkout);

router.route('/:id')
  .get(apiLimiter, protect, getWorkout)
  .put(apiLimiter, protect, updateWorkout)
  .delete(apiLimiter, protect, deleteWorkout);

router.put('/:id/complete', apiLimiter, protect, completeWorkout);

module.exports = router;
