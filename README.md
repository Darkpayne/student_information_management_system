# 🎓 Student Info Management System (Next.js)

A simple Next.js app to view, add, edit, delete, and search student records.

## 📦 Authentication Credentials
email: admin@admin.com
password: 12345


## 🚀 Features

- List all students
- View student details
- Add new students
- Edit existing students
- Delete students
- Search by name, major, or GPA

## 📦 Tech Stack

- Next.js (App Router)
- TypeScript
- In-memory data (for demo)
- API Routes

## ▶️ Getting Started

```bash
git clone https://github.com/your-username/student-management-nextjs.git
cd student-management-nextjs
npm install
npm run dev

📌 API Endpoints
GET /api/students — All students (supports ?query=)

GET /api/students/[id] — Single student

POST /api/students — Add student

PUT /api/students/[id] — Update student

DELETE /api/students/[id] — Delete student

POST /api/auth — Login In

GET /api/auth/logout — Logout