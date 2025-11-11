const express = require('express');
const {
  getExercises,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise
} = require('../controllers/exerciseController');
const { protect } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.route('/')
  .get(apiLimiter, protect, getExercises)
  .post(apiLimiter, protect, createExercise);

router.route('/:id')
  .get(apiLimiter, protect, getExercise)
  .put(apiLimiter, protect, updateExercise)
  .delete(apiLimiter, protect, deleteExercise);

module.exports = router;
