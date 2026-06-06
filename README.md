# Mini Event Registration Dashboard

A robust and modern Event Registration Management System built with **Laravel 11** and **Next.js 14**. This project provides a comprehensive solution for managing event attendees with a focus on high-performance data handling, security, and a premium user experience.

## 🌟 Project Overview
This dashboard allows administrators to efficiently manage event registrations. It features a stateless RESTful API backend and a highly interactive frontend, adhering to modern software engineering standards and clean architecture principles.

## 🚀 Key Features

### 1. Registration Management
- **Intelligent List View:** High-performance table with server-side **Search** (Name, Email, Event), **Status Filtering**, and **Multi-column Sorting**.
- **Comprehensive Creation Form:** Dynamic form for adding new registrations with real-time validation and user-friendly feedback.
- **Detailed Registration Insights:** Dedicated detail page showcasing full attendee information and a **Visual Timeline** of registration events.
- **Dynamic Status Transitions:** Seamlessly transition registration states (Pending, Confirmed, Cancelled) with immediate UI updates.

### 2. Advanced System Capabilities
- **Data Portability:** Integrated **Export to CSV** functionality for offline analysis and reporting.
- **Full-scale Pagination:** Optimized server-side pagination for handling large datasets efficiently.
- **Robust Security:** Administrative route protection using **Laravel Sanctum** (Session-based for web).
- **Premium UX/UI:**
  - **Skeleton Loading:** Fluid placeholder states during data fetching.
  - **Debounced Search:** Minimized API calls with intelligent input delay.
  - **State-Aware UI:** Purpose-built **Empty States** and **Error States** with retry capabilities.
  - **Design System:** Consistent aesthetic using a custom **Design Token** system (Tailwind + CSS Variables).

## 🛠 Technical Stack

### Backend (Laravel 11)
- **API Architecture:** Stateless REST API using **Laravel API Resources** for structured JSON responses.
- **Validation:** Strict server-side validation using Form Requests.
- **Database:** SQLite (default) with a clean schema and automated seeders.
- **Testing:** Comprehensive feature testing powered by **Pest**.

### Frontend (Next.js 14 & React)
- **Framework:** Next.js 14 (App Router) with **TypeScript** for strict type safety.
- **Form Management:** **React Hook Form** paired with **Zod** for schema-based validation.
- **Styling:** Tailwind CSS with a customized color palette and spacing system.
- **Data Fetching:** Axios with custom hooks for state management and error handling.

## 📦 Getting Started

### Option 1: Using Docker (Recommended)
The project is fully containerized for an immediate development experience.
```bash
docker-compose up -d
```
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8000](http://localhost:8000)
- **DB Admin (SQLite Web):** [http://localhost:8081](http://localhost:8081)

### Option 2: Manual Installation

#### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan serve
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 🔑 Test Credentials (Admin)
- **Email:** `admin@example.com`
- **Password:** `admin`

## 📡 API Endpoints (Brief)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/registrations` | List with Search/Filter/Sort |
| `POST` | `/api/registrations` | Create new registration |
| `GET` | `/api/registrations/{id}` | Get detailed info |
| `PATCH` | `/api/registrations/{id}/status` | Update status |
| `GET` | `/api/registrations/export` | Download CSV |
| `GET` | `/api/summary` | Dashboard statistics |

## 🧪 Quality Assurance
Core functionalities are protected by automated tests to ensure regressions are caught early.
```bash
# Run Backend Tests
cd backend
php artisan test
```

## 🧠 Architectural Highlights
- **Service-Oriented Thinking:** Logic is kept out of controllers, prioritizing clean, reusable abstractions.
- **Single Source of Truth:** Centralized types and schemas shared across the frontend components.
- **User-Centric Messaging:** Custom error handling that translates technical failures into helpful, human-readable instructions.
- **Atomic Components:** Highly reusable UI components following a modular structure.
