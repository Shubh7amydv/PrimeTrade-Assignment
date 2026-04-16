#!/bin/bash

# Primetrade Quick Start Script
# This script helps you set up both backend and frontend

echo "=================================================="
echo "Primetrade - Scalable REST API Setup"
echo "=================================================="
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd backend
echo "Installing backend dependencies..."
npm install

if [ ! -f .env ]; then
  echo "Creating .env file (update with your database credentials)..."
  cp .env.example .env 2>/dev/null || cat > .env << EOF
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=primetrade_db
DB_DIALECT=mysql
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=7d
NODE_ENV=development
SYNC_DB=false
EOF
fi

echo ""
echo "⚠️  Backend Setup Complete!"
echo "Next steps:"
echo "1. Update credentials in backend/.env"
echo "2. Create MySQL database: mysql -u root -p -e 'CREATE DATABASE primetrade_db;'"
echo "3. Start backend: cd backend && npm run dev"
echo ""

# Frontend Setup
cd ../frontend
echo "📦 Setting up Frontend..."
echo "Installing frontend dependencies..."
npm install

echo ""
echo "✅ Setup Complete!"
echo ""
echo "=================================================="
echo "To start the application:"
echo "=================================================="
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm run dev"
echo "  (runs on http://localhost:3000)"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm start"
echo "  (runs on http://localhost:3000 - may differ)"
echo ""
echo "=================================================="
echo "API Documentation:"
echo "=================================================="
echo "- Postman Collection: backend/Postman_Collection.json"
echo "- API Base URL: http://localhost:3000/api/v1"
echo "- Documentation: README.md and backend/README.md"
echo ""
