# 🎟️ EventHub - Event Registration Management System

EventHub is a professional-grade registration management solution featuring a powerful Laravel backend and a modern Next.js dashboard. It is designed to streamline the attendee registration process with real-time analytics and an intuitive management interface.

---

## 🚀 Key Features & Implementation

### 📋 Core Registration Features

- **Registration List:**
  - **Comprehensive Table:** Display all attendees with full details.
  - **Real-time Search:** Search by name, email, or event name.
  - **Dynamic Filtering:** Filter attendees by status (Pending, Confirmed, Cancelled).
  - **Multi-column Sorting:** Sort data by date, name, or event.
- **Create Registration:**
  - **Intuitive Form:** Clean UI for adding new attendees.
  - **Robust Validation:** Real-time client-side and secure server-side validation.
- **Registration Detail:**
  - **Detailed View:** Full attendee profile and event information.
  - **Audit Timeline:** A visual historical log of all status changes and activity.
- **Status Management:**
  - **Direct Updates:** Easily change attendee status with instant feedback.
  - **Audit Logging:** Every status change is automatically logged for transparency.
- **Dashboard Summary:**
  - **Real-time Analytics:** Interactive data visualization of registration statistics.
  - **Status Proportions:** Live Pie Chart representing the distribution of attendee statuses.

### 🌟 Bonus Features
- **Pagination:** Smooth server-side pagination for handling large datasets.
- **Export CSV:** One-click data export for offline reporting and analysis.
- **Route Protection:** Secure authentication using Laravel Sanctum to protect sensitive data.
- **TypeScript Implementation:** 100% Type-safe frontend for better maintainability and error prevention.
- **Advanced Form Management:** Powered by React Hook Form and Zod for scalable validation.
- **Automated Testing:** 
  - **Backend:** Functional and unit tests using Pest Framework.
  - **Frontend:** Component and logic verification with Vitest.
- **CI/CD Pipeline:** Fully automated testing and quality checks via GitHub Actions.
- **UX Optimizations:**
  - **Fully Responsive:** Mobile-first design, optimized for desktop, tablet, and smartphone.
  - **Skeleton Loading:** Elegant loading states to enhance perceived performance.
  - **Debounce Search:** Optimized API calls during search input.
  - **Error & Empty States:** Comprehensive handling for all possible data scenarios.

---

## 🛠️ Technical Stack

- **Backend API:** Laravel 11 (PHP 8.2+), RESTful Architecture.
- **Frontend UI:** Next.js 14 (App Router), TypeScript, Tailwind CSS.
- **Database:** SQLite (Local & Docker-ready).
- **CI/CD:** GitHub Actions (Full-stack quality assurance).

---

## 📂 Getting Started & Demo

### 🐳 Run with Docker (Recommended)
The system is fully containerized for an "it works on my machine" experience:
1.  `docker-compose up -d`
2.  The backend will automatically:
    - Install dependencies.
    - Setup SQLite database.
    - Run Migrations & Seeders (Creating demo data).
3.  Access:
    - **Frontend:** `http://localhost:3000`
    - **API / Health:** `http://localhost:8000/up`
    - **DB Admin (Web):** `http://localhost:8081` (Manage SQLite via UI)

### 👤 Demo Credentials (Admin Account)
Use these details to access the protected dashboard:
- **Email:** `admin@example.com`
- **Password:** `admin`

### 🌱 Seed Data
Running the migration with seeders will populate the system with:
- 1 Admin User.
- 12 Curated Mock Registration records with varied statuses and timelines for realistic testing.

---

## 🧪 Quality Assurance & CI/CD
We utilize GitHub Actions to ensure code quality on every push:
- **Backend:** PHPUnit/Pest tests and environment checks.
- **Frontend:** Type checking, Linting, and Unit tests.
- **Full-stack Build:** Ensures both tiers are production-ready.


---

## 📈 Design Rationale

**Architectural Vision**
My primary goal was to build a system that transcends basic CRUD functionality, delivering an **enterprise-ready experience** focusing on user experience (UX) and architectural scalability. By choosing a **decoupled architecture**, I ensured that the backend and frontend remain independent, allowing for cleaner maintenance and future-proofing.

**The Tech Stack Choice**
- **Laravel 11 (Backend):** Selected for its robust routing and database migration system. I implemented **Laravel Sanctum** to handle secure, token-based authentication between the Next.js frontend and the API, ensuring a seamless and protected workflow.
- **Next.js 14 (Frontend):** Utilized the App Router for optimized performance and **TypeScript** across the entire project to eliminate runtime errors and ensure strict type safety during development.

**Development Philosophy**
- **Atomic Design & Reusability:** I approached UI development by breaking down elements into independent components (e.g., `Button`, `Badge`, `StatusSelect`). This ensures visual consistency across the dashboard and makes the codebase significantly easier to scale or refactor.
- **Data Integrity & Audit Trail:** Transparency is key in registration systems. I designed a dedicated `registration_logs` table to power a **Visual Timeline**, recording every status change with timestamps and administrative notes. This provides a complete audit trail for data integrity.
- **UX-First Approach:** To improve perceived performance, I implemented **Skeleton Loading** states instead of generic spinners. I also integrated **Debounced Search** to optimize server load by preventing excessive API calls during user input.

**Commitment to Quality**
I believe that **"Untested code is broken code."** To ensure long-term stability, I implemented a suite of automated tests. This includes functional tests for status transitions in the backend and component verification in the frontend, preventing regressions and ensuring a reliable system for every stakeholder.

---