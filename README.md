# ☁️ Cloud File Intelligence

یک سیستم هوشمند آپلود و تحلیل فایل با هوش مصنوعی

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![Node](https://img.shields.io/badge/node-v24-green)
![License](https://img.shields.io/badge/license-MIT-purple)
![Status](https://img.shields.io/badge/status-active-success)

---

## ✨ امکانات کلی

- 📁 آپلود فایل با drag & drop
- 📕 خواندن و تحلیل فایل‌های PDF
- 🖼️ پشتیبانی از عکس و متن
- 🤖 تحلیل با هوش مصنوعی
- 📝 خلاصه‌سازی خودکار
- 💡 استخراج نکات کلیدی
- ❓ پرسش و پاسخ از محتوای فایل
- ☁️ ذخیره فایل روی Cloud با لینک دائمی
- 📋 تاریخچه دائمی تحلیل‌ها
- 🌙 Dark mode
- ⭐ امتیازدهی به نتایج
- 🔔 Toast notifications
- 🔍 جستجو در تاریخچه

---

## 📦 تاریخچه نسخه‌ها

### v1.2.0 — دیتابیس و تاریخچه دائمی
> آخرین نسخه پایدار

**امکانات جدید:**
- ✅ دیتابیس SQLite برای ذخیره دائمی تحلیل‌ها
- ✅ تاریخچه بعد از بستن مرورگر هم باقی میمونه
- ✅ جستجو در تاریخچه تحلیل‌ها
- ✅ API endpoint برای دریافت تاریخچه (`GET /history`)
- ✅ API endpoint برای جستجو (`GET /search?q=...`)
- ✅ README کامل و آپدیت شده

---

### v1.1.0 — Cloud Storage و UI حرفه‌ای

**امکانات جدید:**
- ✅ آپلود فایل روی Cloudinary
- ✅ لینک دائمی برای هر فایل
- ✅ دانلود فایل از Cloud
- ✅ حذف فایل از Cloud
- ✅ کپی لینک فایل
- ✅ پیش‌نمایش عکس بعد از آپلود
- ✅ Dark mode با یه کلیک
- ✅ Toast notifications به جای alert
- ✅ Skeleton loading هنگام تحلیل
- ✅ Progress bar روان و هوشمند
- ✅ امتیازدهی به نتیجه تحلیل
- ✅ Glassmorphism UI
- ✅ فونت فارسی Vazirmatn
- ✅ انیمیشن‌های روان

---

### v1.0.0 — نسخه اولیه

**امکانات پایه:**
- ✅ آپلود فایل با drag & drop
- ✅ تحلیل PDF، عکس و متن
- ✅ خلاصه‌سازی با هوش مصنوعی
- ✅ استخراج نکات کلیدی
- ✅ پرسش و پاسخ از محتوای فایل
- ✅ Backend با Node.js و Express
- ✅ مدیریت آپلود با Multer
- ✅ استخراج متن PDF
- ✅ اتصال به OpenRouter API

---

## 🛠️ تکنولوژی‌ها

| بخش | تکنولوژی |
|-----|----------|
| Backend | Node.js + Express |
| آپلود فایل | Multer |
| خواندن PDF | pdfreader |
| هوش مصنوعی | OpenRouter API |
| Cloud Storage | Cloudinary |
| دیتابیس | SQLite + better-sqlite3 |
| Frontend | HTML + CSS + JavaScript |
| فونت | Vazirmatn |
| Version Control | Git + GitHub |

---

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها
- Node.js v18 یا بالاتر
- اکانت OpenRouter
- اکانت Cloudinary

### مراحل نصب

**۱. کلون کردن پروژه:**
```bash
git clone https://github.com/Alimhmdiii/cloud-file-intelligence.git
cd cloud-file-intelligence
```

**۲. نصب پکیج‌ها:**
```bash
cd backend
npm install
```

**۳. ساخت فایل `.env`:**
```env
OPENROUTER_API_KEY=کلید_openrouter
CLOUDINARY_CLOUD_NAME=نام_cloud
CLOUDINARY_API_KEY=کلید_cloudinary
CLOUDINARY_API_SECRET=سکرت_cloudinary
PORT=3000
```

**۴. اجرای سرور:**
```bash
npm run dev
```

**۵. باز کردن پروژه:**

فایل `frontend/index.html` رو در مرورگر باز کن.

---

## 📁 ساختار پروژه
cloud-file-intelligence/

├── backend/

│   ├── server.js          # سرور اصلی

│   ├── database.js        # مدیریت دیتابیس

│   ├── intelligence.db    # فایل دیتابیس SQLite

│   ├── package.json       # پکیج‌ها

│   └── uploads/           # فایل‌های موقت

├── frontend/

│   └── index.html         # رابط کاربری

├── .gitignore

└── README.md

---

## 🔌 API Endpoints

| Method | Endpoint | توضیح |
|--------|----------|-------|
| GET | `/` | وضعیت سرور |
| POST | `/analyze` | تحلیل فایل |
| GET | `/history` | دریافت تاریخچه |
| GET | `/search?q=...` | جستجو در تاریخچه |
| DELETE | `/file/:publicId` | حذف فایل از Cloud |

---

## 🗺️ نقشه راه

- [x] فاز ۱ — UI و آپلود فایل
- [x] فاز ۲ — اتصال به هوش مصنوعی
- [x] فاز ۳ — Backend با Node.js
- [x] فاز ۴ — Cloud Storage با Cloudinary
- [x] فاز ۵ — دیتابیس با SQLite
- [ ] فاز ۶ — احراز هویت کاربر
- [ ] فاز ۷ — Deploy روی اینترنت

---

## 👨‍💻 توسعه‌دهنده

ساخته شده با ❤️ توسط **Ali Mohammadi**

---

## 📄 لایسنس

MIT License