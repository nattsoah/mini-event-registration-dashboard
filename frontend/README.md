# 🎨 EventHub - Modern Registration Dashboard (Next.js)

A high-performance, visually stunning dashboard built with Next.js 14, focusing on seamless UX and robust data management.

## 🏛️ Frontend Architecture

- **App Router:** Utilizing Next.js 14 App Router for optimized routing and layouts.
- **Atomic Design:** UI components are organized into `shared`, `ui`, and feature-specific directories for maximum reusability.
- **Custom Hooks:** Business logic (Data fetching, Filtering) is abstracted away from UI components into reusable hooks (`src/hooks`).
- **Route Protection:** Higher-Order Components (HOC) and Context API manage authentication state and protect private dashboard routes.

## 🛠️ Technical Stack

- **Framework:** Next.js 14 (TypeScript)
- **Styling:** Tailwind CSS + Class Variance Authority (CVA)
- **Form Management:** React Hook Form + Zod (Schema-based validation)
- **Data Fetching:** Axios + Custom Hooks
- **Charts:** Recharts for data visualization
- **Icons:** Lucide React
- **Testing:** Vitest + React Testing Library

## ✨ Key Features & UX

- **Fully Responsive Design:** Mobile-first approach using Tailwind CSS, ensuring a seamless experience across all screen sizes.
- **Dashboard Summary:** Real-time statistics with interactive Pie Charts.
- **Advanced Data Table:** Server-side pagination, debounced searching, filtering by status, and multi-column sorting.
- **Dynamic Registration Form:** Real-time client-side validation with user-friendly error messaging.
- **Registration Timeline:** Visual audit trail for status updates and historical data.
- **UI States:** Exhaustive implementation of Skeleton Loaders, Error Boundaries, and Empty States for a "polished" feel.

## 🧪 Testing

The frontend is verified using component and logic tests:
```bash
npm test
```

## 🚀 Installation & Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment:
    ```bash
    cp .env.local.example .env.local
    # Ensure NEXT_PUBLIC_API_URL points to your backend (e.g., http://localhost:8000)
    ```
4.  Start development server:
    ```bash
    npm run dev
    ```
