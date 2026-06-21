# ☁️ Cloud File Intelligence

An intelligent file upload and AI-powered analysis system

![Version](https://img.shields.io/badge/version-1.3.0-blue)
![Node](https://img.shields.io/badge/node-v24-green)
![License](https://img.shields.io/badge/license-MIT-purple)
![Status](https://img.shields.io/badge/status-active-success)

---

## ✨ Features

- 📁 Drag & drop file upload
- 📕 PDF reading and analysis
- 🖼️ Image and text file support
- 🤖 AI-powered analysis
- 🌍 Auto-detects file language and responds in that language
- 📝 Smart summarization
- 💡 Key points extraction
- ❓ Q&A on file content
- ☁️ Permanent cloud storage with Cloudinary
- 📋 Persistent analysis history (SQLite)
- 🔍 Search through history
- 🔐 User authentication (Register/Login)
- 🌙 Dark mode
- ⭐ Rate analysis results
- 🔔 Toast notifications

---

## 📦 Version History

### v1.3.0 — Multi-language Support & Auth Fixes
> Current stable version

**What's new:**
- ✅ AI now detects the file's language and responds in the same language (Persian, English, etc.)
- ✅ Fixed Persian filename encoding bug in database
- ✅ Fixed foreign key constraint errors with stale tokens
- ✅ Fixed database schema migration issues

---

### v1.2.0 — Database & Persistent History

**What's new:**
- ✅ SQLite database for permanent analysis storage
- ✅ History survives browser restarts
- ✅ Search functionality across history
- ✅ `GET /history` and `GET /search` API endpoints

---

### v1.1.0 — Cloud Storage & Professional UI

**What's new:**
- ✅ File upload to Cloudinary
- ✅ Permanent shareable file links
- ✅ Download and delete files from Cloud
- ✅ Copy file link button
- ✅ Image preview after upload
- ✅ Dark mode toggle
- ✅ Toast notifications
- ✅ Skeleton loading states
- ✅ Smooth, intelligent progress bar
- ✅ Star rating for analysis results
- ✅ Glassmorphism UI design
- ✅ Smooth animations throughout

---

### v1.0.0 — Initial Release

**Core features:**
- ✅ Drag & drop file upload
- ✅ PDF, image, and text analysis
- ✅ AI-powered summarization
- ✅ Key points extraction
- ✅ Q&A on file content
- ✅ Node.js + Express backend
- ✅ Multer file handling
- ✅ PDF text extraction
- ✅ OpenRouter API integration

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express |
| File Upload | Multer |
| PDF Reading | pdfreader |
| AI Provider | OpenRouter API |
| Cloud Storage | Cloudinary |
| Database | SQLite + better-sqlite3 |
| Authentication | JWT + bcryptjs |
| Frontend | HTML + CSS + JavaScript |
| Font | Inter |
| Version Control | Git + GitHub |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- OpenRouter account
- Cloudinary account

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/Alimhmdiii/cloud-file-intelligence.git
cd cloud-file-intelligence
```

**2. Install dependencies:**
```bash
cd backend
npm install
```

**3. Create a `.env` file:**
```env
OPENROUTER_API_KEY=your_openrouter_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
JWT_SECRET=your_jwt_secret
PORT=3000
```

**4. Run the server:**
```bash
npm run dev
```

**5. Open the app:**

Open `frontend/auth.html` in your browser to register/login, then you'll be redirected to the main app.

---

## 📁 Project Structure
cloud-file-intelligence/

├── backend/

│   ├── server.js          # Main server

│   ├── database.js        # Database logic

│   ├── intelligence.db    # SQLite database file

│   ├── package.json       # Dependencies

│   └── uploads/           # Temporary file storage

├── frontend/

│   ├── auth.html          # Login / Register page

│   └── index.html         # Main app UI

├── .gitignore

└── README.md
---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/` | Server health check | No |
| POST | `/auth/register` | Create new account | No |
| POST | `/auth/login` | Login | No |
| GET | `/auth/me` | Get current user | Yes |
| POST | `/analyze` | Analyze a file | Yes |
| GET | `/history` | Get analysis history | Yes |
| GET | `/search?q=...` | Search history | Yes |
| DELETE | `/file/:publicId` | Delete file from Cloud | Yes |

---

## 🗺️ Roadmap

- [x] Phase 1 — UI and file upload
- [x] Phase 2 — AI integration
- [x] Phase 3 — Node.js backend
- [x] Phase 4 — Cloud storage with Cloudinary
- [x] Phase 5 — SQLite database
- [x] Phase 6 — User authentication
- [ ] Phase 7 — Deploy to production

---

## 👨‍💻 Developer

Built with ❤️ by **Ali Mohammadi**

---

## 📄 License

MIT License