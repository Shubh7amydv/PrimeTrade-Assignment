# Primetrade Backend API

## 📋 Overview

A scalable REST API built with Node.js and Express featuring:
- ✅ User registration & login with JWT authentication
- ✅ Role-based access control (user vs admin)
- ✅ CRUD APIs for Task management
- ✅ API versioning (v1)
- ✅ Comprehensive error handling
- ✅ Input validation & sanitization
- ✅ Password hashing with bcrypt

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── serverconfig.js      # Environment configuration
│   │   └── db.js                # MongoDB connection
│   ├── controllers/
│   │   ├── user-controller.js   # User request handlers
│   │   └── task-controller.js   # Task request handlers
│   ├── services/
│   │   ├── user-service.js      # User business logic
│   │   ├── task-service.js      # Task business logic
│   │   └── index.js             # Service exports
│   ├── repository/
│   │   ├── crud-repository.js   # Base CRUD repository
│   │   ├── user-repository.js   # User database operations
│   │   ├── task-repository.js   # Task database operations
│   │   └── index.js             # Repository exports
│   ├── models/
│   │   ├── user.js              # User model definition (Mongoose)
│   │   ├── task.js              # Task model definition (Mongoose)
│   │   └── index.js             # Model exports
│   ├── routes/
│   │   ├── index.js             # Main router
│   │   └── v1/index.js          # API v1 routes
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── utils/
│   │   ├── jwt.js               # JWT token utilities
│   │   ├── password.js          # Password hashing utilities
│   │   └── error-codes.js       # HTTP status codes
│   └── index.js                 # Server entry point
├── package.json
├── .env                         # Environment variables
├── .gitignore
└── Postman_Collection.json      # API documentation
```

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB database (Atlas/local)
- npm or yarn package manager

### 2. Installation

Clone the repository:
```bash
git clone <repository-url>
cd backend
```

Install dependencies:
```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/task_helper_db
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=7d
NODE_ENV=development
ADMIN_EMAIL=admin@taskhelper.com
ADMIN_PASSWORD=admin123
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=User
```

### 5. Run the Server

Development mode (with nodemon):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start at `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user and get JWT token

### Users (Protected)
- `GET /api/v1/users` - Get all users (Admin only)
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user (Admin only)

### Tasks (Protected)
- `POST /api/v1/tasks` - Create new task
- `GET /api/v1/tasks` - Get all tasks (Admin only)
- `GET /api/v1/tasks/:id` - Get task by ID
- `GET /api/v1/tasks/user/:userId` - Get tasks by user ID
- `PATCH /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

## 🔐 Security Features

### Authentication
- JWT token-based authentication
- Password hashing with bcrypt (10 salt rounds)
- Token expiration (7 days by default)

### Authorization
- Role-based access control (RBAC)
- Two roles: `user` and `admin`
- Route-level protection with auth middleware

### Input Validation
- Email validation
- Required field validation at service layer
- Query safety via Mongoose schema validation

### Headers
- CORS enabled
- Helmet for security headers
- Body size limits

## 📋 Request/Response Format

### Success Response
```json
{
  "data": {},
  "success": true,
  "message": "Operation successful",
  "err": {}
}
```

### Error Response
```json
{
  "data": {},
  "success": false,
  "message": "Error message",
  "err": "Error details"
}
```

## 🔌 Example Usage

### 1. Register User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### 2. Login User
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user"
    }
  },
  "success": true,
  "message": "User logged in successfully",
  "err": {}
}
```

### 3. Create Task
```bash
POST /api/v1/tasks
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

{
  "title": "Complete project",
  "description": "Finish the backend API",
  "priority": "high",
  "dueDate": "2026-12-31",
  "userId": 1
}
```

## 📊 Database Schema (MongoDB)

### User Document
- `_id` (ObjectId)
- `email` (unique, required)
- `password` (required, hashed)
- `firstName` (required)
- `lastName` (required)
- `role` (`user` or `admin`, default `user`)
- `isActive` (boolean)
- `createdAt`, `updatedAt`

### Task Document
- `_id` (ObjectId)
- `title` (required)
- `description` (optional)
- `status` (`pending`, `in-progress`, `completed`)
- `priority` (`low`, `medium`, `high`)
- `dueDate` (optional date)
- `userId` (ObjectId ref User, required)
- `createdAt`, `updatedAt`
| userId | INT | FOREIGN KEY (users.id) |
| createdAt | DATETIME | AUTO |
| updatedAt | DATETIME | AUTO |

## 🛠️ Technology Stack

### Backend
- **Framework**: Express.js (4.18.2)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Middleware**: 
  - Body Parser (request parsing)
  - CORS (Cross-origin requests)
  - Helmet (security headers)

### Development
- **Environment**: Node.js
- **Development Tool**: Nodemon
- **Package Manager**: npm

## 🚀 Scalability Considerations

### Current Architecture
1. **MVC Pattern**: Separation of concerns (Controllers → Services → Repositories)
2. **Middleware**: Centralized authentication and authorization
3. **Error Handling**: Global error handling middleware
4. **Reusable Components**: Base CRUD repository for code reuse

### Future Optimization
1. **Caching Layer**: Implement Redis for session and frequently accessed data
2. **Rate Limiting**: Add rate limiter middleware to prevent abuse
3. **Logging**: Implement Winston or Bunyan for structured logging
4. **Monitoring**: Add APM tools like New Relic for performance monitoring
5. **Database Index**: Create indexes on frequently queried columns
6. **API Gateway**: Implement Kong or AWS API Gateway for routing and throttling
7. **Microservices**: Split into smaller services (Auth Service, Task Service)
8. **Message Queue**: Implement RabbitMQ for async operations
9. **Docker**: Containerize application for easy deployment
10. **Load Balancing**: Use Nginx or AWS ALB for distributing traffic

## 📝 API Documentation

A Postman collection is provided: `Postman_Collection.json`

Import into Postman:
1. Open Postman
2. Click "Import"
3. Select the `Postman_Collection.json` file
4. Replace `YOUR_JWT_TOKEN` with actual token from login response

## ⚠️ Important Notes

1. **JWT Secret**: Change `JWT_SECRET` in production
2. **Database Password**: Do not commit `.env` file with actual credentials
3. **CORS**: Configure CORS origin based on frontend URL
4. **Rate Limiting**: Implement rate limiting for production
5. **Input Validation**: Add request validation middleware for production

## 🐛 Error Codes

| Code | Description |
|------|-------------|
| 201 | Success (Development) |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## 📞 Support

For issues or questions, please create an issue in the repository.

## 📄 License

ISC
