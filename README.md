# Frontend Developer Task – Frontend Developer Intern

## 📌 Overview

This project is a **scalable web application with authentication and a dashboard**.  
The primary focus is on frontend engineering, with a supportive backend to demonstrate full-stack integration, security, and scalability best practices.

---

## 🚀 Tech Stack

### Frontend

- React.js
- TailwindCSS (Dark Mode UI)
- Axios
- React Router DOM

### Backend

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- bcrypt (password hashing)

---

## ✨ Core Features Implemented

### ✅ Frontend (Primary Focus)

- Responsive UI using **TailwindCSS**
- Dark mode professional dashboard
- Login & Registration forms with validation
- Protected routes (Dashboard accessible only after login)
- Centralized API service using Axios
- Search and time-based filtering for tasks

### ✅ Backend (Supportive)

- RESTful APIs using Express.js
- JWT-based authentication (login/register)
- Secure password hashing using bcrypt
- User profile fetch API
- CRUD operations on a sample entity (**Tasks**)
- MongoDB integration with Mongoose
- Middleware-based authentication & error handling

### ✅ Dashboard Features

- Display authenticated user profile
- Full CRUD functionality on tasks
- Search tasks by title
- Time-based filters:
  - All Tasks
  - Most Recent
  - Last 24 Hours
  - Last 7 Days
- Logout flow

### ✅ Security & Scalability

- Passwords stored as hashed values
- JWT authentication middleware
- Role-safe APIs (user-specific data access)
- Modular folder structure (routes, controllers, middleware)
- Easily extensible frontend & backend architecture

---

## 📂 Project Structure

```
assignment/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.css
│
└── README.md
```

---

## 🔐 Authentication Flow

1. User registers with name, email, and password
2. Password is hashed using bcrypt before storing
3. User logs in and receives a JWT
4. JWT is stored on the client and sent via Authorization header
5. Protected routes validate JWT before allowing access

---

## 🔍 Search & Filter Logic

- Client-side search using controlled inputs
- Time-based filtering using `createdAt` timestamps
- Sorting handled efficiently on the frontend to reduce backend load

---

## 📬 API Endpoints (Summary)

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Tasks

- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

---

## 🔧 Environment Variables

Create a `.env` file inside the **backend** directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
---

## 📈 Scalability Notes (Production Ready)

For production deployment:

- Frontend and backend would be deployed independently
- API base URLs would be managed via environment variables
- JWT tokens would be stored using HttpOnly cookies
- Frontend state management can be scaled using Redux or React Query
- Backend can be extended into service-based architecture
- Database indexing would be added for large datasets

---

## 🧪 How to Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```
