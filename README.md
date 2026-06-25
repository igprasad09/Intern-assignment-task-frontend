# 📊 Product Inventory Frontend Dashboard

[![React](https://img.shields.io/badge/React-v18+-61dafb.svg?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3+-38bdf8.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black.svg?logo=vercel)](https://vercel.com/)

A modern, high-performance **React** dashboard designed for real-time inventory management. It features custom dark mode styling, seamless category filtering, an inline mock data generator, and an efficient cursor-based pagination interface.

Built as part of the CodeVector Internship Frontend Assignment.

---

## ✨ Features

- **🎨 Modern Dark UI:** Clean, fully responsive layout built with Tailwind CSS, optimized for high-scannability at a glance.
- **⚡ Background Seeding:** Inline data generator lets you seamlessly inject any quantity of mock items into the catalog without breaking your current view.
- **🏷️ Dynamic Category Sorting:** Fast filters across `Electronics`, `Fashion`, `Books`, `Furniture`, and `Sports` that handle empty-state placeholders cleanly.
- **📜 Cursor-Based Pagination:** Efficient pagination using database cursors instead of offsets for better scalability.
- **💀 Animated Loading States:** Custom skeleton loading grids to provide a fluid, premium UX during API updates.

---

## 🚀 Tech Stack

- **Framework:** React.js (Functional Components & Hooks)
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Deployment:** Vercel

---

## 📡 Connected Backend APIs

The frontend seamlessly connects to the deployed backend server:

### Base URL

```text
https://intern-assignment-task.vercel.app
```

### Endpoints Used

#### Fetch Products

```http
GET /alldata?categoryfilter=&cursorDate=&cursorId=
```

Returns products in batches of 10.

Example:

```http
GET /alldata?categoryfilter=Electronics
```

#### Generate Mock Products

```http
GET /generate?limit=
```

Example:

```http
GET /generate?limit=1000
```

Creates 1000 random products in the database.

---

## 📦 Installation & Local Setup

### 1. Clone the Repository

```bash
git clone <your-frontend-repository-url>
cd <your-project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API URL

Create a `.env` file in the root folder:

```env
VITE_API_URL=https://intern-assignment-task.vercel.app
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 🏗️ Project Structure

```text
src/
│
├── components/
│   ├── ProductCard.jsx
│   ├── ProductSkeleton.jsx
│
├── pages/
│   ├── Dashboard.jsx
│
├── App.jsx
├── main.jsx
│
└── assets/
```

---

## 🎯 Core Functionality

### Category Filtering

Users can instantly filter products by:

- Electronics
- Fashion
- Books
- Furniture
- Sports

### Cursor Pagination

The dashboard uses:

```text
cursorDate
cursorId
```

instead of traditional page numbers.

Benefits:

- Faster database queries
- Better scalability
- No skipped records during inserts
- Consistent sorting

### Product Generator

Users can dynamically generate thousands of records without refreshing the page.

Example:

```text
Generate 5000 Products
```

The UI remains responsive while the backend processes the request.

---

## 🌐 Deployment

### Build Project

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel

```bash
vercel
```

---

## 📸 Screenshots

Add screenshots here:

```md
![Dashboard](./screenshots/dashboard.png)
```

---

## 👨‍💻 Assignment Requirements Covered

✅ Product listing

✅ Category filtering

✅ Cursor-based pagination

✅ Loading states

✅ Responsive design

✅ API integration

✅ Mock data generation

✅ Vercel deployment

---

## 🔗 Live Demo

Frontend:

```text
[intern-assignment-task-frontend.vercel.app](https://intern-assignment-task-frontend.vercel.app/)
```

Backend:

```text
https://intern-assignment-task.vercel.app
```

---

## 📄 License

This project was developed for the CodeVector Internship Assignment and is intended for educational and evaluation purposes.
