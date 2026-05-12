# Week 3 — REST API with Express & MongoDB

## Overview

A Node.js backend built with Express and Mongoose, implementing a full REST API for **Users** and **Products** with JWT-based authentication and protected routes.

## Project Structure

```
week3/
├── server.js                 # Express app entry point, DB connection
├── package.json
├── req.http                  # HTTP request samples for testing
│
├── APIs/
│   ├── UserAPI.js            # User routes (CRUD + login)
│   └── ProductAPI.js         # Product routes (CRUD)
│
├── auth/
│   └── auth.js               # Login handler, JWT signing
│
├── middlewares/
│   └── verifyToken.js        # JWT verification middleware for protected routes
│
└── models/
    ├── UserModel.js           # Mongoose schema/model for User
    └── ProductModel.js        # Mongoose schema/model for Product
```

## Tech Stack

| Package | Purpose |
|---------|---------|
| `express` | HTTP server and routing |
| `mongoose` | MongoDB ODM |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT creation and verification |
| `cookie-parser` | Parse cookies for token delivery |

## API Endpoints

### User API — `/user-api`

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/user` | Create a new user | Public |
| GET | `/users` | Get all users | Protected |
| GET | `/user/:id` | Get user by ID | Protected |
| PUT | `/user/:id` | Update user | Protected |
| DELETE | `/user/:id` | Delete user | Protected |
| POST | `/login` | Login & get JWT token | Public |

### Product API — `/product-api`

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/product` | Create product | Protected |
| GET | `/products` | Get all products | Protected |
| GET | `/product/:id` | Get product by ID | Protected |
| PUT | `/product/:id` | Update product | Protected |
| DELETE | `/product/:id` | Delete product | Protected |

## Setup & Run

```bash
# Install dependencies
npm install

# Start MongoDB locally (default port 27017)
# Then start the server
node server.js
```

The server runs on **port 4000**.

## Authentication Flow

1. `POST /user-api/login` with `{ username, password }` → returns a JWT in a cookie
2. Include the cookie in subsequent requests to access protected routes
3. The `verifyToken` middleware validates the JWT on every protected route

## Error Handling

The global error handler at the bottom of `server.js` catches:
- `ValidationError` — returns 400 with validation details
- `CastError` — returns 400 for invalid MongoDB IDs
- All other errors — returns 500

## Prerequisites

- Node.js
- MongoDB running locally on port 27017