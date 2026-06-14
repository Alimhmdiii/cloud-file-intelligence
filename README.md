# ☁️ Cloud File Intelligence

یک سیستم هوشمند آپلود و تحلیل فایل با هوش مصنوعی

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node](https://img.shields.io/badge/node-v24-green)
![License](https://img.shields.io/badge/license-MIT-purple)

---

## ✨ امکانات

- 📁 آپلود فایل با drag & drop
- 📕 خواندن و تحلیل فایل‌های PDF
- 🖼️ پشتیبانی از فایل‌های عکس و متن
- 🤖 تحلیل با هوش مصنوعی
- 📝 خلاصه‌سازی خودکار
- 💡 استخراج نکات کلیدی
- ❓ پرسش و پاسخ از محتوای فایل
- 📋 تاریخچه تحلیل‌ها

---

## 🛠️ تکنولوژی‌ها

| بخش | تکنولوژی |
|-----|----------|
| Backend | Node.js + Express |
| آپلود فایل | Multer |
| خواندن PDF | pdfreader |
| هوش مصنوعی | OpenRouter API |
| Frontend | HTML + CSS + JavaScript |
| Version Control | Git + GitHub |

---

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها
- Node.js v18 یا بالاتر
- اکانت OpenRouter

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
```bash
OPENROUTER_API_KEY=کلید_خودت
PORT=3000
```

**۴. اجرای سرور:**
```bash
node server.js
```

**۵. باز کردن پروژه:**

فایل `frontend/index.html` رو در مرورگر باز کن.

---

## 📁 ساختار پروژه
cloud-file-intelligence/

├── backend/

│   ├── server.js          # سرور اصلی

│   ├── package.json       # پکیج‌ها

│   └── uploads/           # فایل‌های آپلود شده

├── frontend/

│   └── index.html         # رابط کاربری

├── .gitignore

└── README.md
---

## 🗺️ نقشه راه

- [x] فاز ۱ — UI و آپلود فایل
- [x] فاز ۲ — اتصال به هوش مصنوعی  
- [x] فاز ۳ — Backend با Node.js
- [ ] فاز ۴ — Cloud Storage با Cloudinary
- [ ] فاز ۵ — دیتابیس با PostgreSQL
- [ ] فاز ۶ — احراز هویت و Deploy

---

## 👨‍💻 توسعه‌دهنده

ساخته شده با ❤️ توسط **Ali Mohammadi**

---

## 📄 لایسنس

MIT License