# 🏢 Society Maintenance Tracker

A full-stack web application for efficient complaint management in residential societies. The system enables residents to submit complaints with images, while administrators can assign staff, manage priorities, update complaint statuses, publish notices, and monitor complaint statistics through an interactive dashboard.

---

## 📌 Features

### 👤 Resident

- Secure Registration & Login
- Submit maintenance complaints
- Upload complaint images
- Track complaint status
- View complaint history with timestamps
- View assigned maintenance staff
- View society notices
- View important (pinned) notices

### 👨‍💼 Admin

- Secure Admin Login
- View all complaints
- Search complaints
- Filter by Category
- Filter by Status
- Filter by Priority
- Assign complaints to maintenance staff
- Set complaint priority (Low / Medium / High)
- Update complaint status
- View complaint history
- Dashboard analytics
- Overdue complaint tracking
- Create notices
- Pin important notices
- Delete notices

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (Image Upload)

---

# 📂 Project Structure

```
Society_Maintenance_Tracker
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── middleware
│   │   └── config
│   │
│   ├── uploads
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/prajktamore154-hue/Society_Maintenance_Tracker.git
```

---

## Install Client

```bash
cd client
npm install
```

---

## Install Server

```bash
cd server
npm install
```

---

## Environment Variables

Create a `.env` file inside the **server** folder.

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Run Backend

```bash
cd server
npm run dev
```

---

## Run Frontend

```bash
cd client
npm run dev
```

---

# 📊 Dashboard Features

- Complaint Statistics
- Complaint Category Analytics
- Complaint Status Analytics
- Overdue Complaint Detection
- Search & Filters
- Notice Management

---

# 📷 Screenshots

- Login Page
- Resident Dashboard
- Admin Dashboard
- Complaint Management
- Notice Board

*(Add screenshots here before final submission if required.)*

---

# 🔮 Future Enhancements

- Email Notifications
- SMS Alerts
- Mobile Application
- Real-time Notifications
- Analytics Charts
- Complaint Rating System

---

# 👩‍💻 Author

**Prajkta More**

B.Tech Information Technology

---

# 📄 License

This project is developed for academic and educational purposes.