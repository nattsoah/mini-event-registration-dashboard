# Project Guidelines (Mandatory)

กฎและมาตรฐานการพัฒนาสำหรับโปรเจกต์ Mini Event Registration Dashboard เพื่อคุณภาพระดับ Portfolio

## 🏛️ Architecture Consistency (Mandatory)
- **Unified Layout:** ทุกหน้า Dashboard (Summary, List, Detail, Form) **ต้องใช้ `DashboardLayout`** เพื่อให้มี Sidebar และ Navbar แสดงผลคงที่เสมอ
- **Stateless Components:** แยก Logic (Data Fetching, Filtering) ออกจาก UI โดยใช้ Custom Hooks เสมอ
- **Route Protection:** หน้า Dashboard ทั้งหมดต้องอยู่ภายใต้ Middleware `auth:sanctum` และตรวจสอบสถานะ Auth ในฝั่ง Frontend

## 🎨 Design System & UI
- **Design Tokens:** ต้องใช้งานผ่าน CSS Variables ที่กำหนดไว้ใน `globals.css` เท่านั้น
- **Tailwind Classes:** ห้ามใช้ Hardcoded Hex Colors ให้ใช้ Class มาตรฐาน เช่น `bg-primary`, `text-success`
- **Spacing & Radius:** ใช้ระบบ Spacing 4 (p-4, gap-4) และ `rounded-xl` (0.75rem) สำหรับ Card/Modal เพื่อความสม่ำเสมอ
- **UI State Requirements:** ทุกหน้าต้องมี Loading (Skeleton), Error, และ Empty State

## 💻 Clean Code & Reusability
- **Atomic Design:** แยก UI ที่ใช้ซ้ำ (Badge, Button, Card, Table) ไว้ใน `src/components/shared` หรือ `ui` ห้ามเขียนโค้ดซ้ำซ้อน
- **TypeScript:** ใช้ Strict Mode ห้ามใช้ `any` และต้องนิยาม Interface/Type ใน `src/types` เท่านั้น
- **Form Management:** ใช้ **React Hook Form + Zod** สำหรับ Validation เสมอ โดยเก็บ Schema ไว้ใน `src/schemas`
- **DRY (Don't Repeat Yourself):** หากพบ Logic หรือ UI ที่ใช้ซ้ำเกิน 2 ครั้ง ต้องสกัดเป็น Reusable Logic/Component ทันที

## 🚦 Error Handling & UX
- **User-Friendly Messaging:** ข้อความ Error ต้องชัดเจนและสื่อสารกับผู้ใช้ทั่วไป (Human-readable)
- **Action Feedback:** ทุกการกดปุ่มบันทึกหรือเปลี่ยนสถานะ ต้องมี Loading State และ Toast Notification แจ้งผล

## 🧪 Testing & Validation (Mandatory)
- **Zero-Tolerance for Untested Code:** ทุกครั้งที่เสร็จสิ้นงานในแต่ละ Step หรือ Branch **ต้องมีการเขียน Automated Test ครบถ้วนเสมอ**
    - **Backend:** ใช้ **Pest Framework** สำหรับ Feature และ Unit Testing
    - **Frontend:** ใช้ **Vitest + React Testing Library** สำหรับ Component และ Logic Testing
- **Test Coverage:** ต้องทดสอบทั้ง Happy Path (การทำงานปกติ) และ Edge Cases (กรณีเกิดข้อผิดพลาด)
- **Continuous Validation:** ก่อนส่งมอบงานหรือสร้าง PR ต้องรัน Test Suite ทั้งหมดเพื่อให้มั่นใจว่าไม่มี Regression

## 🔄 Development Process
1. **Research & Strategy:** วิเคราะห์ความต้องการก่อนเริ่มงาน
2. **Implementation:** เขียนโค้ดตามมาตรฐาน Clean Code
3. **Verification & Testing:** ต้องทดสอบทุกครั้งหลังเสร็จงาน
4. **Summary:** สรุปผลการทำงานและผลการทดสอบทุกครั้ง
