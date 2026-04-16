# Primetrade Frontend

## Overview

A beautiful React frontend for the Primetrade REST API, featuring user authentication, task management, and a responsive UI.

## 🚀 Features

- ✅ User Registration & Login
- ✅ JWT Token Management
- ✅ Protected Routes
- ✅ Task CRUD Operations
- ✅ Responsive Design
- ✅ Context API for State Management
- ✅ Real-time Updates


## 🔧 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running at http://localhost:3000

### Setup

1. Navigate to the frontend directory:
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

The frontend will open at `http://localhost:3001`

## 📚 Available Scripts

### Development
```bash
npm run dev
```
Runs the app in development mode on port 3001.

### Build
```bash
npm build
```
Builds the app for production.

### Test
```bash
npm test
```
Runs the test suite.

## 🔐 Authentication Flow

1. **Register**: Users create an account with email, password, and name
2. **Login**: Users authenticate with credentials and receive JWT token
3. **Storage**: Token is saved in localStorage for persistent session
4. **Protected Routes**: Only authenticated users can access the dashboard
5. **API Requests**: Token is automatically added to API request headers

## 🎨 UI Components

### Pages
- **Home**: Landing page with feature overview
- **Login**: User authentication
- **Register**: New user registration
- **Dashboard**: Task management interface

### Components
- **Navbar**: Navigation with user info and logout
- **ProtectedRoute**: Route guard for authenticated pages


## 🎯 Key Features Explained

### Token Management
- Tokens are stored in localStorage
- Automatically added to all API requests via axios interceptor
- Persists across browser sessions

### Protected Routes
- Routes are protected using `ProtectedRoute` component
- Redirects unauthenticated users to login page
- Uses AuthContext for state management

### Task Management
- Create, read, update, delete tasks
- Filter tasks by user
- Change task status and priority
- Set due dates

## 💻 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Performance Optimizations

- Lazy loading for routes
- CSS modules for scoped styling
- Context API for minimal re-renders
- Debounced API calls

## 📱 Responsive Design

The frontend is fully responsive:
- Desktop: Multi-column layouts
- Tablet: Adjusted spacing and layouts
- Mobile: Single column, touch-friendly buttons

## 🔐 Security Features

- JWT token-based authentication
- Secure token storage and retrieval
- Protected routes for authenticated content
- Input validation
- CORS-enabled API communication
