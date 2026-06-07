# 🚀 EventHub - Event Registration Backend (Laravel API)

A robust, secure, and scalable RESTful API built with Laravel 11 to manage event registrations, status tracking, and reporting.

## 🏛️ Architecture & Design Patterns

- **RESTful API Design:** Adheres to REST principles for predictable and clean endpoint structures.
- **Repository-like Controller Pattern:** Clean separation of concerns using Form Requests for validation and Eloquent Resources for data transformation.
- **Service-Oriented Logic:** Core business logic is encapsulated within models and controllers, ensuring high maintainability.
- **Security:** Implementation of **Laravel Sanctum** for token-based authentication and route protection.

## 🛠️ Technical Stack

- **Framework:** Laravel 11 (PHP 8.2+)
- **Database:** SQLite (Lightweight, file-based database)
- **Authentication:** Laravel Sanctum
- **CI/CD:** GitHub Actions (Automated Workflows)
- **Testing:** Pest Framework (Functional & Unit Testing)
- **Tooling:** Composer, Artisan CLI

## 📂 Database Structure & Seeding

The system uses an SQLite database designed for integrity and auditability:

1.  **Users:** Management accounts for administrative access.
2.  **Registrations:** Core table storing attendee details (Name, Email, Phone, Event Name, Status).
3.  **Registration Logs:** Audit trail/Timeline table.

### 🌱 Demo Data & Admin Access
The project includes a `DatabaseSeeder` that creates:
- **Admin User:** `admin@example.com` / `admin`
- **Mock Data:** Generates 12 curated registration records with realistic timelines for immediate testing.

To seed the database:
```bash
php artisan migrate:fresh --seed
```

## 🔌 API Documentation

### Public Endpoints
- `POST /api/registrations` - Create a new registration (with validation).

### Protected Endpoints (Requires Sanctum Token)
- `GET /api/registrations` - List all registrations (Supports Pagination, Search, Filtering, and Sorting).
- `GET /api/registrations/{id}` - Retrieve detailed registration info with Timeline logs.
- `PATCH /api/registrations/{id}/status` - Update registration status.
- `GET /api/summary` - Dashboard statistics and recent activity.
- `GET /api/registrations/export` - Export all data to CSV format.

### Authentication
- `POST /api/login` - User authentication.
- `POST /api/logout` - Revoke access token.

## 🧪 Testing & CI/CD

The backend is verified through automated tests and integrated with GitHub Actions:
- **Local Testing:** `php artisan test`
- **CI Pipeline:** Checks for environment consistency and test coverage on every push.

## 🚀 Installation & Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    composer install
    ```
3.  Configure environment:
    ```bash
    cp .env.example .env
    # Update DB_DATABASE, DB_USERNAME, DB_PASSWORD in .env
    ```
4.  Generate app key:
    ```bash
    php artisan key:generate
    ```
5.  Run migrations and seeders:
    ```bash
    php artisan migrate --seed
    ```
6.  Start the server:
    ```bash
    php artisan serve
    ```
