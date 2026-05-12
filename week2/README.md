# Week 2 — Advanced JavaScript & Object-Oriented Patterns

## Overview

Exploration of modern JavaScript features — destructuring, spread/rest operators, shallow/deep copy, closures, and object-oriented design. Projects range from standalone scripts to small multi-file applications simulating real-world systems like a shopping cart, bank, and exam portal.

## File Structure

```
week2/
├── BankTranscation.js        # Bank account transaction simulation
├── DailyTemperature.js       # Daily temperature tracker
├── DeepCopyOrders.js         # Deep copy of order objects using structuredClone / JSON
├── EmployeePayroll.js        # Payroll calculation with objects
├── LibraryManagement.js      # Library book management system
├── MoviePlatform.js          # Movie platform with user ratings
├── OTPcountDown.js           # OTP countdown timer using setInterval
├── OnlineCOurse.js           # Online course enrollment management
├── StudentDashboard.js       # Student marks dashboard
├── StudentMarksList.js       # Marks list with array methods
├── examPortalSimulator.js    # Exam portal simulator
├── restOperators.js          # Rest operator demonstrations
├── shallowCopyUsers.js       # Shallow copy of user objects
├── shoppingCart.js           # Shopping cart with add/remove/total
├── spreadFruits.js           # Spread operator with arrays
├── spreadUsers.js            # Spread operator with objects
│
├── E-commerceCart/           # Multi-file e-commerce cart app
│   ├── app.js                # Entry point
│   ├── cart.js               # Cart logic
│   ├── discount.js           # Discount rules
│   ├── payment.js            # Payment processing
│   └── product.js            # Product definitions
│
└── TodolistApp/              # Multi-file to-do list app
    ├── app.js                # Entry point
    ├── task.js               # Task model
    └── validator.js          # Input validation
```

## Concepts Covered

- Spread (`...`) and rest operators
- Shallow copy vs. deep copy (`Object.assign`, `structuredClone`)
- Object destructuring
- `setInterval` / `setTimeout` for async simulation
- Closure-based patterns
- Array methods: `map`, `filter`, `reduce`, `find`
- Modular code split across multiple files

## How to Run

Single-file scripts:
```bash
node shoppingCart.js
```

Multi-file apps (from their directory):
```bash
cd E-commerceCart
node app.js

cd TodolistApp
node app.js
```

## Prerequisites

- Node.js installed