const express = require('express');
const {
  getExercises,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise
} = require('../controllers/exerciseController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getExercises)
  .post(protect, createExercise);

router.route('/:id')
  .get(protect, getExercise)
  .put(protect, updateExercise)
  .delete(protect, deleteExercise);

module.exports = router;
