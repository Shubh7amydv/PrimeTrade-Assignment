# Task-Helper - Scalable REST API with Task Management

A complete full-stack application demonstrating best practices for building scalable, secure REST APIs with role-based access control, combined with a beautiful React frontend.

## 🌐 Live Demo

**Frontend:** https://prime-trade-assignment-omega.vercel.app/

## 📊 Project Overview

This project implements a production-ready backend API with:
- ✅ JWT Authentication & Authorization
- ✅ Role-Based Access Control (RBAC)
- ✅ CRUD APIs for Task Management
- ✅ Secure Password Hashing
- ✅ API Versioning
- ✅ Comprehensive Error Handling
- ✅ Beautiful React Frontend UI

## 🚀 Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with database credentials:
```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/task_helper_db
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@primetrade.com
ADMIN_PASSWORD=admin123
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=User
```

5. Start the server:
```bash
npm run dev
```

Server runs at: `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend runs at: `http://localhost:3001`

## 🔐 API Authentication

### Registration
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

### Login
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response includes JWT token:
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
  "success": true
}
```

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get token

### Users (Protected)
- `GET /api/v1/users` - Get all users (Admin only)
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user (Admin only)

### Tasks (Protected)
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks` - Get all tasks (Admin only)
- `GET /api/v1/tasks/:id` - Get task by ID
- `GET /api/v1/tasks/user/:userId` - Get user's tasks
- `PATCH /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

## 💾 Database Schema (MongoDB)

### users Collection
- `_id`, `email`, `password`, `firstName`, `lastName`, `role`, `isActive`, `createdAt`, `updatedAt`

### tasks Collection
- `_id`, `title`, `description`, `status`, `priority`, `dueDate`, `userId`, `createdAt`, `updatedAt`


## 🚀 Deployment & Scalability

### Current Setup
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Frontend**: React 18
- **Authentication**: JWT


### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **ODM**: Mongoose
- **Database**: MongoDB
- **Authentication**: JWT
- **Password Security**: bcrypt
- **Logging**: Express middleware
- **Security**: Helmet, CORS

### Frontend
- **Library**: React 18
- **Routing**: React Router v6
- **State Management**: Context API
- **HTTP Client**: Axios
- **Styling**: CSS
- **Build Tool**: Create React App

### Development Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Development Server**: Nodemon (backend), Create React App (frontend)
- **API Testing**: Postman
- **Database**: MongoDB Atlas / Compass

## 📱 Features Breakdown

### User Management
- User registration with validation
- Secure login with JWT tokens
- User profile management
- Role assignment (user/admin)
- Account activation/deactivation

### Task Management
- Create tasks with Title, Description, Priority, Due Date
- Update task status (pending, in-progress, completed)
- Change task priority (low, medium, high)
- Delete tasks
- View user-specific tasks
- View all tasks (Admin only)

# PrimeTrade-Assignment
