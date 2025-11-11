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
const { objectIdValidation, exerciseValidation } = require('../middleware/validation');

const router = express.Router();

router.route('/')
  .get(apiLimiter, protect, getExercises)
  .post(apiLimiter, protect, exerciseValidation, createExercise);

router.route('/:id')
  .get(apiLimiter, protect, objectIdValidation, getExercise)
  .put(apiLimiter, protect, objectIdValidation, updateExercise)
  .delete(apiLimiter, protect, objectIdValidation, deleteExercise);

module.exports = router;
