# Project Guidelines (Mandatory)

กฎและมาตรฐานการพัฒนาสำหรับโปรเจกต์ Mini Event Registration Dashboard

## 🎨 Design System & UI
- **Design Tokens:** ต้องใช้งานผ่าน CSS Variables ที่กำหนดไว้ใน `globals.css` เท่านั้น
- **Tailwind Classes:** ห้ามใช้ Hardcoded Hex Colors ใน Component ให้ใช้ Class อย่าง `bg-primary`, `text-success`, `border-gray-200` เท่านั้น
- **Spacing:** ใช้ระบบ Spacing มาตรฐานของ Tailwind (e.g., p-4, m-2) เพื่อความสม่ำเสมอ
- **Radius:** ใช้ `rounded-lg` (0.75rem) สำหรับ Card และ Modal ตามที่กำหนดไว้ใน Theme

## 🚦 UI State Requirements (Mandatory)
ทุกๆ หน้า (Page) หรือส่วนประกอบหลัก (Component) ต้องมีการจัดการสถานะดังนี้:
- **Loading State:** ต้องมี Skeleton Loading หรือ Spinner ขณะรอข้อมูล
- **Error State:** ต้องมีการแสดงข้อความเตือน (Alert) เมื่อเกิดข้อผิดพลาดจาก API หรือการเชื่อมต่อ
- **User-Friendly Messaging (Mandatory):** ข้อความแจ้งเตือนข้อผิดพลาด (Error Messages) ทั้งฝั่ง Backend และ Frontend ต้องชัดเจน เข้าใจง่าย และไม่ใช้ศัพท์เทคนิคที่ทำให้ผู้ใช้สับสน (เช่น ใช้ "Invalid email or password" แทน "These credentials do not match our records")
- **Empty State:** ต้องมีการแสดงผลที่ชัดเจน (เช่น Illustration หรือ Text) เมื่อไม่มีข้อมูลในรายการ

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
3. **Verification & Testing:** ต้องทำการทดสอบ (Manual หรือ Automated) ทุกครั้งหลังเสร็จสิ้นงาน เพื่อยืนยันว่าสิ่งที่ทำถูกต้องและไม่กระทบส่วนอื่น
4. **Summary:** สรุปผลการทำงานและผลการทดสอบให้ผู้ใช้ทราบทุกครั้ง
