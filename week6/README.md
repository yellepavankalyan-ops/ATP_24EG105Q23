# Week 6 — React State Management & Full-Stack Capstone

## Overview

Advanced React patterns using Context API and Zustand for state management. Includes three standalone React projects and a full-stack capstone — an Employee Management app with an Express/MongoDB backend and a React frontend.

## Project Structure

```
week6/
├── Counter/                  # React Context API counter (multi-box sync)
├── UserCard/                 # User card display with context-based count
├── Users/                    # Form to create users with state management
└── Employee_demo_capstone/   # Full-stack Employee CRUD app
    ├── Backend/              # Express + MongoDB REST API
    └── latest/               # React frontend (Vite + Tailwind + Zustand)
```

---

## Counter

A counter app where multiple UI boxes share a single counter value via **React Context API**. All boxes stay perfectly in sync — incrementing or decrementing any box updates all of them.

**Key files:** `src/contexts/ContextProvider.jsx`, `src/App.jsx`

**Run:**
```bash
cd Counter
npm install
npm run dev
```

---

## UserCard

Displays user cards fetched from the context. Demonstrates reading shared state in child components using `useContext`.

**Run:**
```bash
cd UserCard
npm install
npm run dev
```

---

## Users

A form-based React app for creating users. Demonstrates controlled form inputs and state updates.

**Run:**
```bash
cd Users
npm install
npm run dev
```

---

## Employee_demo_capstone

A full-stack CRUD application for managing employee records.

### Backend

| Tech | Details |
|------|---------|
| Framework | Express 5 |
| Database | MongoDB via Mongoose |
| Port | 2000 |
| Config | `.env` file for `DB_URL` |

**Setup:**
```bash
cd Employee_demo_capstone/Backend
npm install
# Create .env with: DB_URL=mongodb://localhost:27017/empdb
node server.js
```

**API Endpoints — `/emp-api`:**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/employees` | Get all employees |
| POST | `/employee` | Create employee |
| PUT | `/employee/:id` | Update employee |
| DELETE | `/employee/:id` | Delete employee |

### Frontend (`latest/`)

React 19 + Vite + Tailwind CSS + **Zustand** for global state.

**Components:**
- `Home.jsx` — Employee list overview
- `ListofEmps.jsx` — Table of all employees
- `CreateEmp.jsx` — Form to add a new employee
- `EditEmp.jsx` — Edit an existing employee
- `Employee.jsx` — Single employee card
- `Header.jsx` — App navigation header
- `Rootlayout.jsx` — Layout wrapper

**State management:** `src/store/CouterStore.js` (Zustand store)

**Setup:**
```bash
cd Employee_demo_capstone/latest
npm install
npm run dev
```
Open `http://localhost:5173`. Backend must be running on port 2000.

## Concepts Covered

- React Context API (creating provider, consuming with `useContext`)
- Zustand for lightweight global state
- Full-stack communication (React ↔ Express REST API)
- CORS configuration
- Environment variables with `dotenv`
- Mongoose CRUD operations