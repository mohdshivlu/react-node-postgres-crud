# 🚀 Full Stack CRUD Application

A **Full Stack CRUD** web application built using **React** (Frontend), **Node.js + Express** (Backend), and **PostgreSQL** (Database).  
It allows users to **Create**, **Read**, **Update**, **Delete**, and **Search** records via a user-friendly interface.

---

## 🧰 Tech Stack

### 🔹 Frontend

- ⚛️ React.js
- 🔗 Axios (for API communication)
- 💅 Bootstrap (optional, for styling)
- 🎉 SweetAlert2 (for beautiful alerts)

### 🔹 Backend

- 🟢 Node.js
- 🚂 Express.js
- 🐘 PostgreSQL
- 🔄 Sequelize (ORM for PostgreSQL)

### 🔹 Tools

- 📬 Postman (for testing APIs)
- 🛠️ Git & GitHub (for version control)

---

## 📁 Folder Structure

```
Curd_FullStack/
├── backend/    # Express.js + PostgreSQL backend
└── frontend/   # React.js frontend
```

---

## ⚙️ Getting Started

Follow the steps below to set up and run the application locally.

### 1️⃣ Clone the Repository

```bash
git clone git@github.com:mohdshivlu/react-node-postgres-crud.git
cd Curd_FullStack
```

---

### 2️⃣ Setup Backend (Express + PostgreSQL)

```bash
cd backend
npm install
```

- Create a `.env` file in the backend folder and add your PostgreSQL credentials:

```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_db_name
DB_PORT=5432
PORT=8000
```

- Start the backend server:

```bash
npm start
```

The backend will be running at: 👉 **http://localhost:8000**

---

### 3️⃣ Setup Frontend (React)

```bash
cd ../frontend
npm install
```

- Create a `.env` file in the frontend folder and add your backend URL:

```
VITE_API_BASE_URL=http://localhost:8000
```

- Start the frontend app:

```bash
npm run dev
```

The frontend will be available at: 👉 **http://localhost:5173**

---

## 📸 Features

- ➕ Add new records
- 📋 View all records
- 🔍 Search entries
- ✏️ Update existing records
- ❌ Delete records with confirmation
- ✅ User-friendly UI with instant feedback using SweetAlert2

---

## 🧑‍💻 Author

**Mohd Shivlu**  
🔗 [LinkedIn](https://linkedin.com/in/mohdshivlu)  
📧 mohdshivlu1245@gmail.com 
🌐 [GitHub Profile](https://github.com/mohdshivlu)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
