<<<<<<< HEAD
# 🎒 Lost & Found - Campus Item Management System

> MERN Stack Project | B.Tech 4th Semester | AI308B - AI Driven Full Stack Development

---

## 📋 Project Overview

A web-based Lost & Found Item Management System for college campuses built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

### Features
- ✅ Student Registration & Secure Login (JWT + bcrypt)
- ✅ Report Lost & Found Items
- ✅ View All Reported Items
- ✅ Search Items by Name / Filter by Type
- ✅ Update / Delete Own Items
- ✅ Protected Routes (JWT Middleware)
- ✅ Responsive Advanced UI

---

## 🗂️ Project Structure

```
lost-found/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT protect middleware
│   ├── models/
│   │   ├── User.js            # Student schema (name, email, hashed password)
│   │   └── Item.js            # Item schema (name, desc, type, location, date, contact)
│   ├── routes/
│   │   ├── authRoutes.js      # POST /api/register, POST /api/login
│   │   └── itemRoutes.js      # Full CRUD + Search for items
│   ├── .env                   # Environment variables (DO NOT COMMIT)
│   ├── package.json
│   └── server.js              # Express app entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.js  # Global auth state (React Context)
    │   ├── components/
    │   │   ├── Navbar.js / .css
    │   │   ├── ItemCard.js / .css
    │   │   └── AddItemModal.js / Modal.css
    │   ├── pages/
    │   │   ├── Register.js / Auth.css
    │   │   ├── Login.js
    │   │   └── Dashboard.js / Dashboard.css
    │   ├── styles/
    │   │   └── global.css      # Design system / CSS variables
    │   ├── api.js              # Axios config + all API calls
    │   ├── App.js              # React Router setup
    │   └── index.js
    ├── .env
    └── package.json
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/lost-found.git
cd lost-found
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Edit `.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/lostfounddb
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Edit `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm start
```

---

## 🔌 API Endpoints

### Auth APIs (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new student |
| POST | `/api/login` | Login & get JWT token |
| GET | `/api/dashboard` | Protected dashboard route |

### Item APIs (Protected - Requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/items` | Add new item |
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get item by ID |
| PUT | `/api/items/:id` | Update item (owner only) |
| DELETE | `/api/items/:id` | Delete item (owner only) |
| GET | `/api/items/search?name=xyz` | Search by name |
| GET | `/api/items/search?type=Lost` | Filter by type |

### Authentication Header
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🌐 Deployment

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Lost & Found MERN app"
git remote add origin https://github.com/YOUR_USERNAME/lost-found.git
git push -u origin main
```

### Step 2: Deploy Backend on Render
1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repo
3. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Environment Variables:
   - `MONGO_URI` = your MongoDB Atlas URI
   - `JWT_SECRET` = your secret key
   - `CLIENT_URL` = your frontend URL (after frontend deployed)
   - `NODE_ENV` = production

### Step 3: Deploy Frontend on Render
1. New → Static Site
2. Connect same GitHub repo
3. Settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
4. Add Environment Variable:
   - `REACT_APP_API_URL` = your backend Render URL + `/api`

---

## 🔐 Security Features
- Passwords hashed using **bcryptjs** (salt rounds: 10)
- Authentication via **JWT tokens** (7 day expiry)
- Protected routes via middleware
- Ownership check before update/delete
- Duplicate email prevention
- Global 401 handler (auto-logout)

---

## 📸 Screenshots
*(Add screenshots of Registration, Login, Dashboard, Postman tests, MongoDB, Render deployment)*

---

## 👤 Author
- **Name:** [Your Name]
- **Enrollment No:** [Your Enrollment]
- **Branch:** B.Tech CSE/AI
- **Semester:** 4th | Subject: AI308B

---

## 🔗 Deployment Links
- **Backend (Render):** https://lost-found-backend.onrender.com
- **Frontend (Render):** https://lost-found-frontend.onrender.com
- **GitHub Repository:** https://github.com/YOUR_USERNAME/lost-found
=======
# lost-found-project
>>>>>>> 020b61e139882387907fb41555976793852112b3
