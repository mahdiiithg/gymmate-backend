# GymMate Backend

A RESTful API backend for a gym and fitness tracking application built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Exercise management (CRUD operations)
- Workout tracking and management
- Role-based access control (User, Trainer, Admin)
- Secure password hashing with bcryptjs
- Comprehensive input validation with express-validator
- Rate limiting to prevent abuse
- NoSQL injection protection
- CORS configuration with origin whitelisting
- Security headers with Helmet
- MongoDB integration with Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mahdiiithg/gymmate-backend.git
cd gymmate-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gymmate
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=*
```

## Running the Application

### Development mode:
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

## Running Tests

```bash
npm test
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Exercises
- `GET /api/exercises` - Get all exercises (Protected)
- `GET /api/exercises/:id` - Get single exercise (Protected)
- `POST /api/exercises` - Create new exercise (Protected)
- `PUT /api/exercises/:id` - Update exercise (Protected)
- `DELETE /api/exercises/:id` - Delete exercise (Protected)

### Workouts
- `GET /api/workouts` - Get all user workouts (Protected)
- `GET /api/workouts/:id` - Get single workout (Protected)
- `POST /api/workouts` - Create new workout (Protected)
- `PUT /api/workouts/:id` - Update workout (Protected)
- `DELETE /api/workouts/:id` - Delete workout (Protected)
- `PUT /api/workouts/:id/complete` - Mark workout as completed (Protected)

### Health Check
- `GET /health` - Check API status

## Project Structure

```
gymmate-backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── exerciseController.js
│   │   └── workoutController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Exercise.js
│   │   └── Workout.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── exercises.js
│   │   └── workouts.js
│   ├── utils/
│   │   └── jwt.js
│   └── server.js
├── tests/
│   └── auth.test.js
├── .env.example
├── .gitignore
├── jest.config.js
├── package.json
└── README.md
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Security Features

This backend implements multiple layers of security:

### Rate Limiting
- **Authentication endpoints**: 5 requests per 15 minutes per IP
- **General API endpoints**: 100 requests per 15 minutes per IP
- Prevents brute force attacks and API abuse

### Input Validation
- All inputs are validated using express-validator
- Email format validation
- MongoDB ObjectId validation
- Required fields enforcement
- Data type and range validation

### NoSQL Injection Prevention
- express-mongo-sanitize removes dangerous query operators
- Input validation prevents malicious data entry
- Parameterized queries through Mongoose

### CORS Protection
- Configurable origin whitelist (comma-separated in .env)
- Credentials support enabled
- No wildcards in production

### Other Security Measures
- Helmet.js for secure HTTP headers
- Bcrypt for password hashing (salt rounds: 10)
- JWT tokens with configurable expiration
- Secure email regex (no ReDoS vulnerability)

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

## License

ISC

