# Getting Started with Primetrade

## 🎯 Project Overview

This is a complete full-stack application built following your Flight Search Service architecture patterns:

- **Backend**: Node.js + Express with MVC + Repository pattern
- **Frontend**: React 18 with Context API
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based with role-based access control

## 📂 Project Location

```
/Users/saurabhyadav/Desktop/Primetrade Assignment/
├── backend/              # Express API
├── frontend/             # React App
├── README.md             # Main project documentation
├── SCALABILITY_NOTES.md  # Scaling strategies
└── setup.sh              # Quick setup script
```

## ⚡ Quick Start (5 minutes)

### 1. Environment Setup

#### Backend Configuration
```bash
cd backend
# Create .env file with database credentials
cat > .env << EOF
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/task_helper_db
JWT_SECRET=your_jwt_secret_key_keep_it_safe
JWT_EXPIRES_IN=7d
NODE_ENV=development
ADMIN_EMAIL=admin@taskhelper.com
ADMIN_PASSWORD=admin123
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=User
EOF
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### 3. Start the Application

```bash
# Terminal 1 - Start Backend
cd backend
npm run dev
# Output: Server started at http://localhost:3000

# Terminal 2 - Start Frontend
cd frontend
npm run dev
# Opens http://localhost:3001
```

## 🔐 First Time Usage

### Create Test Accounts

**Admin Account** (for testing admin features):
```
Email: admin@primetrade.com
Password: admin123
First Name: Admin
Last Name: User
```

Note: Admin user is bootstrapped from backend environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_FIRST_NAME`, `ADMIN_LAST_NAME`) during backend startup. All normal registrations continue to be created with `user` role.

**Regular User Account**:
```
Email: user@primetrade.com
Password: user123
First Name: John
Last Name: Doe
```

### Frontend Usage

1. **Home Page** - Overview and navigation
2. **Register** - Create new account
3. **Login** - Sign in with credentials
4. **Dashboard** - Manage your tasks
5. **Create Task** - Add new task with priority and due date
6. **Edit/Delete** - Manage existing tasks

## 📚 Project Structure Explanation

### Backend Architecture (MVC + Repository)

```
Request
  ↓
Router (routes/v1/index.js)
  ├─ Checks request method and path
  ├─ Applies middleware (auth, authorize)
  ↓
Controller (controllers/*)
  ├─ Validates request
  ├─ Calls service layer
  ├─ Formats response
  ↓
Service (services/*)
  ├─ Business logic
  ├─ Data validation
  ├─ Calls repository
  ↓
Repository (repository/*)
  ├─ Database queries
  ├─ Executes CRUD operations
  ↓
Database (MongoDB)
  └─ Stores and retrieves data
```

### Frontend Architecture

```
App.js (Main component with routing)
  ├─ AuthProvider (Context for authentication state)
  │  └─ Provides: user, token, login(), logout()
  ├─ Navbar Component
  │  └─ Navigation and user info
  ├─ Routes
  │  ├─ Home (public)
  │  ├─ Login/Register (public)
  │  ├─ Dashboard (protected)
  │  └─ ProtectedRoute wrapper
  └─ Pages
     ├─ Home
     ├─ Login
     ├─ Register
     └─ Dashboard
```

## 🔌 API Endpoints

### Authentication (No Auth Required)
```
POST /api/v1/auth/register     - Register new user
POST /api/v1/auth/login        - Login user
```

### Users (Auth Required)
```
GET    /api/v1/users           - Get all users (Admin only)
GET    /api/v1/users/:id       - Get user by ID
PATCH  /api/v1/users/:id       - Update user
DELETE /api/v1/users/:id       - Delete user (Admin only)
```

### Tasks (Auth Required)
```
POST   /api/v1/tasks           - Create task
GET    /api/v1/tasks           - Get all tasks (Admin only)
GET    /api/v1/tasks/:id       - Get specific task
GET    /api/v1/tasks/user/:id  - Get user's tasks
PATCH  /api/v1/tasks/:id       - Update task
DELETE /api/v1/tasks/:id       - Delete task
```

## 🧪 Testing the API

### Using Postman

1. Import `backend/Postman_Collection.json` into Postman
2. Test endpoints in this order:
   - Register user
   - Login user (save token)
   - Create task
   - Get tasks
   - Update task
   - Delete task

### Using cURL

```bash
# Register
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@test.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@test.com",
    "password": "password123"
  }'

# Create Task (replace TOKEN)
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the assignment",
    "priority": "high",
    "userId": 1
  }'
```

## 🔧 Configuration Guide

### Backend Configuration (.env)

| Variable | Purpose | Example |
|----------|---------|---------|
| PORT | Server port | 3000 |
| MONGO_URI | MongoDB connection string | mongodb://127.0.0.1:27017/task_helper_db |
| JWT_SECRET | Token secret key | your_secret_key |
| JWT_EXPIRES_IN | Token expiration | 7d |
| NODE_ENV | Environment | development |

### Frontend Configuration

Update API URL in `src/utils/api.js`:
```javascript
const API_URL = "http://localhost:3000/api/v1";
```

## 🎨 Frontend Features

### Components Used

- **Navbar**: Navigation with logout
- **ProtectedRoute**: Route wrapper for auth
- **Authentication Forms**: Register/Login
- **Dashboard**: Task management interface
- **Task Cards**: Individual task display

### Styling Approach

- CSS files for each major component
- Responsive design (mobile, tablet, desktop)
- Gradient background theme
- Smooth transitions and animations

### State Management

- **AuthContext**: User and token state
- **LocalStorage**: Persist token and user data
- **Component State**: Form inputs and UI state

## 📊 Database Schema

### User Collection
```text
_id (ObjectId)
email (String, unique)
password (String, hashed)
firstName (String)
lastName (String)
role (user/admin)
isActive (Boolean)
createdAt (Date)
updatedAt (Date)
```

### Task Collection
```text
_id (ObjectId)
title (String)
description (String)
status (pending/in-progress/completed)
priority (low/medium/high)
dueDate (Date)
userId (ObjectId, ref User)
createdAt (Date)
updatedAt (Date)
```

## 🐛 Troubleshooting

### Backend Won't Start

**Error**: Port 3000 already in use
```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>
```

**Error**: MongoDB connection refused
```bash
# Check MongoDB is running locally
mongosh
```

### Frontend Not Connecting to Backend

1. Verify backend is running (`npm run dev`)
2. Check API URL in `src/utils/api.js`
3. Check browser console for errors
4. Verify CORS is enabled in backend

### Authentication Issues

1. Clear browser localStorage
2. Check JWT token in DevTools
3. Verify token in requests
4. Check token expiration time

## 📈 Performance Tips

### Backend
- Use connection pooling for databases
- Implement caching for frequently accessed data
- Add database indexes on frequently queried columns
- Use pagination for large datasets

### Frontend
- Lazy load routes
- Memoize expensive components
- Use Request debouncing
- Optimize images and assets

## 🚀 Deployment

### Backend Deployment (Heroku)

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create primetrade-backend

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_connection_string
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

```bash
# Build
npm run build

# Deploy (Vercel)
npm install -g vercel
vercel

# Deploy (Netlify)
# Connect GitHub repo in Netlify dashboard
```

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Main project overview |
| backend/README.md | Backend setup and API guide |
| frontend/README.md | Frontend setup and component guide |
| SCALABILITY_NOTES.md | Scaling strategies and optimization |
| backend/Postman_Collection.json | API endpoints for testing |

## 🎓 Learning Resources

- [Express.js Guide](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [React Hooks and Context](https://react.dev/reference/react)
- [JWT Authentication](https://jwt.io/introduction)
- [MongoDB Documentation](https://www.mongodb.com/docs/)

## 💡 Best Practices Implemented

### Backend
- ✅ MVC architecture with Repository pattern
- ✅ Error handling middleware
- ✅ Input validation
- ✅ Password hashing with bcrypt
- ✅ JWT token management
- ✅ Role-based access control

### Frontend
- ✅ React hooks and Context API
- ✅ Protected routes
- ✅ Responsive design
- ✅ Automated token handling
- ✅ Form validation
- ✅ Error handling

## 🤔 FAQ

**Q: How do I change the JWT secret?**
A: Update `JWT_SECRET` in `.env` file (change in production)

**Q: Can I add more roles besides admin/user?**
A: Yes, modify the User model enum and update middleware authorization

**Q: How do I backup the database?**
A: Use `mongodump` to backup MongoDB database

**Q: Can I use PostgreSQL instead of MySQL?**
A: Yes, but this codebase is now implemented for MongoDB. You would need a separate SQL data layer.

## 🆘 Support

For issues:
1. Check the README files in each directory
2. Review error messages in console/logs
3. Check database connection
4. Verify all environment variables are set
5. Clear cache and restart servers

## 🎉 Next Steps

1. ✅ Project created and working
2. 📝 Test all endpoints with Postman
3. 🎨 Customize frontend styling
4. 🔒 Review security implementation
5. 📊 Study scalability notes
6. 🚀 Deploy to cloud platform
7. 📈 Implement monitoring and logging

---

**Ready to start?** Run your servers and visit http://localhost:3000

**Happy coding! 🚀**
