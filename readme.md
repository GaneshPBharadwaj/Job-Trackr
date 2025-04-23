# 💼 Job Trackr

A full-stack job tracker application to manage your job applications, interviews, and networking contacts — all in one place.

## 📌 Features

- 🔐 **User Authentication** (Register & Login)
- 📝 **Job Application Tracking** – Add, view, and manage job applications
- 🗓️ **Interview Scheduling** – Keep track of interviews
- 🌐 **New Connections** – Store and manage professional contacts
- 🧠 **Redux Toolkit** – State management across components
- 🧾 **Modular CSS** – Scoped styling for each component
- ⚡ **Optimized Build** with Vite

---

## 🛠 Tech Stack

### Frontend
- React
- Redux Toolkit
- React Router DOM
- Vite
- CSS Modules

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Bcrypt

---

## 🚀 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/job-application-management-system.git
cd job-application-management-system
```

### 2. Backend Setup

```bash
cd Backend
npm install
node index.js
```
- Make sure MongoDB is running locally on mongodb:/127.0.0.1:27017/JobManage


### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
- The frontend will run on http://localhost:5173/ by default

### 4. Project Structure

```bash
Job Application Management System/
│
├── Backend/
│   ├── config/            # JWT & MongoDB configs
│   ├── controller/        # Controllers for various models
│   ├── routes/            # Express routes
│   ├── schema/            # Mongoose schemas
│   └── index.js           # Entry point
│
├── frontend/
│   ├── components/        # UI components
│   ├── pages/             # Login, Register, Home
│   ├── reducers/          # Redux slices
│   ├── store.js           # Redux store
│   └── main.jsx           # Entry point
│
└── README.md              # Project overview (you are here)
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.