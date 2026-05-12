# Week 5 — CSS Layouts, Tailwind CSS & Intro to React

## Overview

This week covers CSS layout techniques (Flexbox, tables), utility-first styling with Tailwind CSS, and a first React application with components, props, and state.

## Project Structure

```
week5/
├── FlexProject/              # CSS Flexbox layout demo
│   ├── index.html
│   └── style.css
│
├── Table1/                   # Basic HTML table styling
│   ├── index.html
│   └── style.css
│
├── Table2/                   # Intermediate table with CSS
│   ├── index.html
│   └── style.css
│
├── Table3/                   # Advanced styled table
│   ├── index.html
│   └── style.css
│
├── Tailwind/                 # Tailwind CSS utility class exploration
│   ├── package.json
│   └── src/
│       ├── 1.html            # Tailwind layout examples
│       ├── 2.html
│       ├── input.css         # Tailwind directives
│       └── output.css        # Compiled Tailwind CSS
│
└── React_Js/                 # React application (Vite + Tailwind)
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── App.jsx           # Root component: renders Navbar, Products, Users, Counter, Footer
        ├── main.jsx          # React DOM entry point
        ├── App.css / index.css
        └── components/
            ├── Navbar.jsx    # Navigation bar
            ├── Product.jsx   # Single product card
            ├── Userlist.jsx  # Fetches and displays list of users (API call)
            ├── User.jsx      # Single user card
            ├── Count.jsx     # Counter component with useState
            └── Footer.jsx    # Page footer
```

## Projects

### FlexProject
Demonstrates CSS Flexbox: flex containers, flex direction, justify-content, align-items, and wrapping.

### Table1 / Table2 / Table3
Progressive table styling using CSS — borders, padding, alternating row colors, and hover effects.

### Tailwind
Explores Tailwind CSS utility classes for spacing, typography, colors, and layout without writing custom CSS.

### React_Js

A React 19 app scaffolded with Vite. Features:
- **Product cards** rendered from a static products array passed as props
- **User list** fetched from an external API (`https://jsonplaceholder.typicode.com/users`)
- **Counter** with `useState` hook (increment/decrement)
- **Navbar** and **Footer** as layout components

## Setup & Run

### FlexProject / Tables
Open `index.html` directly in any browser.

### Tailwind
```bash
cd Tailwind
npm install
# Build CSS
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

### React App
```bash
cd React_Js
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

## Tech Stack (React App)

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19 | UI library |
| `react-dom` | ^19 | DOM rendering |
| `vite` | latest | Build tool / dev server |
| `tailwindcss` | ^4 | Utility CSS framework |
| `@vitejs/plugin-react` | latest | Vite plugin for React |

## Prerequisites

- Node.js (for Tailwind and React projects)
- A modern browser (for HTML/CSS projects)