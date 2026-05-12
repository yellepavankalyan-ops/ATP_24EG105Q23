# Week 7 — Full-Stack Blog Application

## Overview

A fully-featured blog platform with role-based access control (Admin, Author, User), JWT authentication with cookies, image uploads via Cloudinary, and a complete React frontend with protected routing.

## Project Structure

```
week7/BLOGAPP/
├── Backend/                  # Express + MongoDB API server
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── APIS/
│   │   ├── AdminAPI.js       # Admin-only routes
│   │   ├── AuthorAPI.js      # Author routes (write/edit articles)
│   │   ├── UserAPI.js        # User routes (read, profile)
│   │   └── CommonAPI.js      # Public routes (login, register, articles)
│   ├── config/
│   │   ├── cloudinary.js     # Cloudinary SDK config
│   │   ├── cloudinaryUpload.js # Upload helper
│   │   └── multer.js         # Multer middleware for file parsing
│   ├── middlewares/
│   │   └── verifyToken.js    # JWT verification middleware
│   ├── models/
│   │   ├── UserModel.js      # User schema (name, email, password, role)
│   │   └── ArticleModel.js   # Article schema (title, body, author, image)
│   └── http/
│       ├── admin_req.http
│       ├── author_req.http
│       └── user_req.http     # HTTP test files for each role
│
└── frontend/                 # React 19 + Vite + Tailwind + React Router
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx            # Router config with protected routes
        ├── main.jsx
        ├── store/
        │   └── authStore.js   # Zustand auth store (user, token, role)
        ├── styles/
        │   └── common.js      # Shared Tailwind class strings
        └── components/
            ├── RootLayout.jsx         # Layout with Header/Footer
            ├── Header.jsx             # Nav with role-aware links
            ├── Footer.jsx
            ├── Home.jsx               # Public articles listing
            ├── Login.jsx              # Login form
            ├── Register.jsx           # Registration form
            ├── Articles.jsx           # All articles view
            ├── ArticleByID.jsx        # Single article detail page
            ├── UserProfile.jsx        # User profile page
            ├── AuthorProfile.jsx      # Author profile & article management
            ├── AuthorArticles.jsx     # Author's article list
            ├── WriteArticles.jsx      # Form to write a new article (with image)
            ├── EditArticle.jsx        # Form to edit an existing article
            ├── AdminProfile.jsx       # Admin dashboard
            ├── ProtectedRoute.jsx     # Route guard by role
            └── Unauthorized.jsx       # 403 page
```

## Tech Stack

### Backend

| Package | Purpose |
|---------|---------|
| `express` ^5 | HTTP server |
| `mongoose` ^9 | MongoDB ODM |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT auth tokens |
| `cookie-parser` | Cookie-based token storage |
| `cors` | Cross-origin requests from frontend |
| `multer` | Multipart form data (image uploads) |
| `cloudinary` | Cloud image storage |
| `dotenv` | Environment variable management |

### Frontend

| Package | Purpose |
|---------|---------|
| `react` ^19 | UI library |
| `react-router-dom` | Client-side routing |
| `zustand` | Global auth state |
| `axios` | HTTP client |
| `react-hook-form` | Form state management |
| `react-hot-toast` | Toast notifications |
| `tailwindcss` ^4 | Styling |

## Roles & Access Control

| Role | Capabilities |
|------|-------------|
| **User** | Read articles, manage profile |
| **Author** | All user capabilities + write, edit, delete own articles |
| **Admin** | Full access: manage users, authors, and all articles |

Protected routes are guarded by `ProtectedRoute.jsx`, which checks the user's role stored in the Zustand `authStore`.

## API Routes

### Common (Public) — `/auth`
- `POST /register` — Register new user
- `POST /login` — Login, set JWT cookie

### User — `/user-api` *(protected)*
- `GET /profile` — Get user profile
- `PUT /profile` — Update profile

### Author — `/author-api` *(author role required)*
- `POST /article` — Create article (with image upload)
- `PUT /article/:id` — Edit article
- `DELETE /article/:id` — Delete article
- `GET /articles` — Get own articles

### Admin — `/admin-api` *(admin role required)*
- `GET /users` — List all users
- `DELETE /user/:id` — Delete a user
- `PUT /user/:id/role` — Change user role

## Setup & Run

### Backend

```bash
cd BLOGAPP/Backend
npm install
```

Create a `.env` file:
```env
DB_URL=mongodb://localhost:27017/blogapp
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

```bash
node server.js
```
Server runs on **port 4000** (confirm in `server.js`).

### Frontend

```bash
cd BLOGAPP/frontend
npm install
npm run dev
```
Open `http://localhost:5173`. Backend must be running first.

## Image Upload Flow

1. Author submits article form with an image file
2. Multer parses the multipart form data on the server
3. File is uploaded to Cloudinary
4. The returned Cloudinary URL is saved in the article's MongoDB document
5. Frontend renders the image URL directly from the article data

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)
- A Cloudinary account (free tier works)