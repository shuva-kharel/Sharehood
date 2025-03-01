# Sharehood-V1.0

A modern full-stack application built with **Node.js** and **plain HTML/CSS/JS**, structured with separate backend and frontend directories for scalability and maintainability.

---

## 📁 Project Structure

```
Sharehood-V1.0/
│
├── backend/         # Backend service (Node.js, Express.js)
│   ├── src/         # Source Code
|   ├── package.json
│   ├── .env         # Environment variables (to be added manually)
│   └── ...
│
├── frontend/        # Frontend application (HTML, CSS, JS)
│   ├── Assets/      # Static assets like images
│   ├── CSS/         # CSS files
│   ├── HTML/        # HTML files
│   ├── JS/          # JavaScript files
│   └── ...
│
└── README.md        # Setup instructions
```

---

## 🚀 Setup Guide

Follow these steps to set up the project on your local machine:

### 1. Install Node Modules

#### Backend Dependencies
Navigate to the `backend` directory and install the required Node.js packages:

```bash
cd backend
npm install
```

#### Frontend Dependencies
Since the frontend is now using plain HTML, CSS, and JS, there are no Node.js dependencies to install for the frontend.

---

### 2. Add Environment Variables

Create a `.env` file inside the `backend` directory with the following content:

```env
MONGO_URI=<your_mongo_db_uri>
PORT=5000
JWT_SECRET=<your_jwt_secret>
NODE_ENV=development

EMAIL_USER=<your_email>
EMAIL_PASS=<your_email_password>

CLIENT_URL=http://localhost:5173
```

Replace `<your_mongo_db_uri>`, `<your_jwt_secret>`, `<your_email>`, and `<your_email_password>` with your actual credentials.

---

### 3. Run the Project

#### Backend
Open a terminal, navigate to the `backend` directory, and run the backend server:

```bash
cd backend
npm run dev
```

#### Frontend
Since the frontend is now using plain HTML, CSS, and JS, you can simply open the HTML files in your browser. No additional server is required for the frontend.

---

## 🌐 Access the Application

Once the backend server is running:

- Frontend: Open the HTML files directly in your browser (e.g., `frontend/HTML/homepage.html`)
- Backend: Runs on [http://localhost:5000](http://localhost:5000)

---

## 🛠 Built With

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: HTML, CSS, JavaScript

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🧑‍💻 Authors

- **Your Name** - [Shuva Khare](https://github.com/shuva-kharel)