# Mini Event Registration Dashboard

A robust and modern Event Registration Management System built with **Laravel 11** and **Next.js 14**. This project provides a comprehensive solution for managing event attendees with a focus on performance, security, and exceptional user experience.

## 🚀 Key Features
- **Admin Dashboard:** Centralized view for managing all registrations with high-performance search and filtering.
- **Advanced Data Handling:** Server-side **Pagination**, multi-column **Sorting**, and status-based **Filtering**.
- **Status Workflow:** Streamlined management of registration states (Pending, Confirmed, Cancelled).
- **Secure Authentication:** Protected administrative routes using Laravel Sanctum.
- **Data Portability:** **Export to CSV** functionality for external data analysis.
- **Modern UI/UX:** Built with a custom **Design System (Tokens)**, featuring a premium Indigo-Slate aesthetic and fully responsive layouts.
- **Data Integrity:** Dual-layer validation (Frontend with Zod, Backend with Laravel Requests).

## 🛠 Tech Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Axios, React Hook Form.
- **Backend:** Laravel 11 (Stateless API), Laravel Sanctum.
- **Database:** SQLite (default for simplicity) / MySQL compatible.
- **Infrastructure:** **Docker & Docker Compose** for seamless environment orchestration.
- **Testing:** **Pest Framework** for automated feature and unit testing.

## 📦 Getting Started

### Option 1: Using Docker (Recommended)
Launch the entire stack (Backend, Frontend, and Database Admin) with a single command:
```bash
docker-compose up -d
```
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8000](http://localhost:8000)
- **DB Admin (SQLite Web):** [http://localhost:8081](http://localhost:8081)

### Option 2: Manual Installation

#### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan serve
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

### 🔑 Test Credentials (Admin)
- **Email:** `admin@example.com`
- **Password:** `admin`

## 🧠 Design Concepts
- **Clean Architecture:** Strict separation between the stateless API and the interactive frontend.
- **Atomic Design Principles:** UI components are built using consistent Design Tokens defined in CSS variables.
- **Test-Driven Mindset:** Core API functionalities are guarded by automated tests to ensure reliability.
- **Scalability:** Built using industry-standard patterns (API Resources, DTOs, and Service-oriented logic) making it easy to extend.

## 🧪 Testing
Run the automated test suite to verify system integrity:
```bash
cd backend
php artisan test
```

## 📊 Database Administration
The project includes a web-based interface for managing the SQLite database. If running via Docker, visit [http://localhost:8081](http://localhost:8081) to view and manage tables directly.
