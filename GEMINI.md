# Project Guidelines (Mandatory)

กฎและมาตรฐานการพัฒนาสำหรับโปรเจกต์ Mini Event Registration Dashboard

## 🎨 Design System & UI
- **Design Tokens:** ต้องใช้งานผ่าน CSS Variables ที่กำหนดไว้ใน `globals.css` เท่านั้น
- **Tailwind Classes:** ห้ามใช้ Hardcoded Hex Colors ใน Component ให้ใช้ Class อย่าง `bg-primary`, `text-success`, `border-gray-200` เท่านั้น
- **Spacing:** ใช้ระบบ Spacing มาตรฐานของ Tailwind (e.g., p-4, m-2) เพื่อความสม่ำเสมอ
- **Radius:** ใช้ `rounded-lg` (0.75rem) สำหรับ Card และ Modal ตามที่กำหนดไว้ใน Theme

## 💻 Code Standards
- **Backend (Laravel):**
    - ใช้ **API Resources** สำหรับการส่งข้อมูลคืนเสมอ
    - ต้องเขียน **Automated Test (Pest)** สำหรับทุกลอจิกใหม่ที่เพิ่มเข้ามา
    - รักษาความสะอาดของ Controller (ใช้ Service หรือ Action หากลอจิกเริ่มซับซ้อน)
- **Frontend (Next.js):**
    - ใช้ **TypeScript** แบบ Strict (ห้ามใช้ `any`)
    - ใช้ **React Hook Form + Zod** สำหรับการจัดการฟอร์ม
    - จัดเก็บ Component แยกส่วน (Atom/Molecule หรือ Feature-based)

## 🔐 Security & Auth
- **Route Protection:** หน้า Dashboard ทั้งหมดต้องอยู่ภายใต้ Middleware `auth:sanctum`
- **Validation:** ต้องทำ Validation ทั้งฝั่ง Backend (Request) และ Frontend (Zod) เสมอ

## 🔄 Development Process
1. **Research & Strategy:** วิเคราะห์ความต้องการก่อนเริ่มงานทุกครั้ง
2. **Implementation:** เขียนโค้ดตามมาตรฐานที่กำหนด
3. **Verification:** รันเทสและเช็คความสวยงามก่อนสรุปงาน
