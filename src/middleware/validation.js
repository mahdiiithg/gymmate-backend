const { body, param, validationResult } = require('express-validator');

// Validation middleware to check for errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array()[0].msg
    });
  }
  next();
};

// Register validation
const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 50 }).withMessage('Name cannot be more than 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
];

// Login validation
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
  validate
];

// MongoDB ObjectId validation
const objectIdValidation = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
  validate
];

// Exercise validation
const exerciseValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Exercise name is required')
    .isLength({ max: 100 }).withMessage('Name cannot be more than 100 characters'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['strength', 'cardio', 'flexibility', 'balance', 'other'])
    .withMessage('Invalid category'),
  body('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid difficulty level'),
  validate
];

// Workout validation
const workoutValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Workout title is required')
    .isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),
  body('exercises')
    .isArray({ min: 1 }).withMessage('Workout must have at least one exercise'),
  body('exercises.*.exercise')
    .isMongoId().withMessage('Invalid exercise ID'),
  body('exercises.*.sets')
    .isInt({ min: 1 }).withMessage('Sets must be at least 1'),
  body('exercises.*.reps')
    .isInt({ min: 1 }).withMessage('Reps must be at least 1'),
  validate
];

module.exports = {
  registerValidation,
  loginValidation,
  objectIdValidation,
  exerciseValidation,
  workoutValidation
};
