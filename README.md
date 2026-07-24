# Lead Management System

## Project Overview

This is a Full Stack **Lead Management System** developed using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**.

The application enables authenticated users to manage customer leads efficiently through secure login and complete CRUD (Create, Read, Update, Delete) operations.

---

## Features

* User Registration
* User Login using JWT Authentication
* Secure Authentication
* Create New Leads
* View All Leads
* Update Existing Leads
* Delete Leads
* Protected Routes
* Responsive User Interface

---

## Technology Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

---

## Project Structure

```text
lead-management-system/
│
├── frontend/
├── backend/
├── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/kumar44254425/lead-management-system.git
```

### Install Backend

```bash
cd backend
npm install
npm start
```

### Install Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## API Endpoints

| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| POST   | /register  | Register User |
| POST   | /login     | Login User    |
| GET    | /leads     | Get All Leads |
| POST   | /leads     | Create Lead   |
| PUT    | /leads/:id | Update Lead   |
| DELETE | /leads/:id | Delete Lead   |

---

## Live Demo

### Frontend

https://lead-management-system-ten-jade.vercel.app/

### Backend API

https://lead-management-system-z6tr.onrender.com

---

## GitHub Repository

https://github.com/kumar44254425/lead-management-system

---

## Author

**Gosukula Kumar**

B.Tech – Computer Science and Engineering

---

## License

This project was developed for educational and assessment purposes as part of the **Digital Heroes Full Stack Development Qualification Task**.
