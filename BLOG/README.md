
# Week 7 - Full Stack Blog Application (BlogSpace)
A complete **Role-Based Full Stack Blog Platform** built with React, Node.js, Express, and MongoDB.
##  Features
### **Authentication & Authorization**
- User Registration with **Cloudinary** profile photo upload
- Login / Logout with JWT (httpOnly cookies)
- Role-based access: **USER**, **AUTHOR**, **ADMIN**
- Account blocking system

### **User (Reader) Features**
- Browse all active articles
- Like / Unlike articles
- Add comments
- View article details

### **Author Features**
- Write and publish new articles
- Edit their own articles
- Soft delete / restore articles

### **Admin Features**
- Manage all users (block/unblock/delete)
- Moderate all articles (block/unblock)
- View system-wide content
##  Tech Stack
Frontend:
- React 19 + Vite
- Tailwind CSS
- Zustand (State Management)
- React Hook Form + React Router
- Axios

Backend:
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (Image Upload)
- bcryptjs
- Multer

## Project Structure
BlogApp/
├── backend/                  # Node.js + Express API
│   ├── APIs/                 # Role-wise routers
│   ├── models/               # User & Article schemas
│   ├── middlewares/          # JWT verification
│   ├── config/               # Cloudinary & Multer
│   └── server.js
│
└── frontend/                 # React Application
├── src/
│   ├── components/       # Reusable UI components
│   ├── store/            # Zustand store
│   └── App.jsx


## 🚀 Setup Instructions

### Backend

cd backend
npm install
# Create .env file
cp .env.example .env

Required Environment Variables:
envDB_URL=mongodb://127.0.0.1:27017/blogapp
PORT=4000
SECRET_KEY=your_secret_key
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

npm run dev
Frontend:
cd frontend
npm install
npm run dev