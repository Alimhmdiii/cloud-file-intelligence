# Cloud File Intelligence

An intelligent file upload and AI-powered analysis system, built with a TypeScript backend following Clean Architecture principles.

![Version](https://img.shields.io/badge/version-1.4.0-blue)
![Node](https://img.shields.io/badge/node-v24-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/license-MIT-purple)
![Status](https://img.shields.io/badge/status-active-success)

---

## Features

- Drag & drop file upload (single or multiple files, up to 5 at once)
- PDF reading and analysis
- Image and text file support
- AI-powered analysis with automatic language detection (responds in the file's own language)
- Smart summarization
- Key points extraction
- Q&A on file content
- Permanent cloud storage with Cloudinary (download, delete, copy link)
- Persistent analysis history (SQLite)
- Search through history
- User authentication (Register/Login with JWT)
- Rate limiting to prevent abuse
- Dark mode
- Rate analysis results
- Accordion-style results for multi-file analysis
- Toast notifications

---

## Architecture

The backend follows **Clean Architecture** principles with clear separation of concerns:
src/

├── config/        # Environment variables, centralized configuration

├── types/         # Shared TypeScript interfaces and types

├── db/            # Database layer (SQLite queries)

├── services/      # Business logic (AI analysis, auth, cloud storage)

├── middleware/     # Authentication and rate limiting

├── controllers/   # Request handlers

├── routes/        # API route definitions

└── app.ts         # Application entry point
Each layer only depends on the layers below it — controllers call services, services call the db layer, and nothing reaches across layers directly. This makes the codebase easier to test, extend, and reason about.

---

## Version History

### v1.4.0 — TypeScript Migration & Clean Architecture
> Current stable version

**What's new:**
- Migrated the entire backend from plain JavaScript to TypeScript
- Restructured into Clean Architecture layers (config, types, db, services, middleware, controllers, routes)
- Added rate limiting on auth and analysis endpoints
- Added multi-file upload support with accordion-style results display
- Strengthened AI prompts to reliably detect and respond in the source file's language
- Replaced the previous monolithic `server.js` with a modular, typed `app.ts`

---

### v1.3.0 — Multi-language Support & Auth Fixes

**What's new:**
- AI detects the file's language and responds in that same language
- Fixed Persian filename encoding bug in database
- Fixed foreign key constraint errors with stale tokens
- Fixed database schema migration issues

---

### v1.2.0 — Database & Persistent History

**What's new:**
- SQLite database for permanent analysis storage
- History survives browser restarts
- Search functionality across history
- `GET /history` and `GET /search` API endpoints

---

### v1.1.0 — Cloud Storage & Professional UI

**What's new:**
- File upload to Cloudinary with permanent shareable links
- Download and delete files from Cloud
- Copy file link button
- Image preview after upload
- Dark mode toggle
- Toast notifications, skeleton loading, smooth progress bar
- Star rating for analysis results
- Glassmorphism UI design

---

### v1.0.0 — Initial Release

**Core features:**
- Drag & drop file upload
- PDF, image, and text analysis
- AI-powered summarization, key points, and Q&A
- Node.js + Express backend with Multer file handling
- OpenRouter API integration

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript |
| Backend | Node.js + Express |
| File Upload | Multer |
| PDF Reading | pdfreader |
| AI Provider | OpenRouter API |
| Cloud Storage | Cloudinary |
| Database | SQLite + better-sqlite3 |
| Authentication | JWT + bcryptjs |
| Rate Limiting | express-rate-limit |
| Frontend | HTML + CSS + JavaScript |
| Version Control | Git + GitHub |

---

## Getting Started

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

**4. Run the server (TypeScript, with auto-reload):**
```bash
npm run dev
```

**5. Open the app:**

Open `frontend/auth.html` in your browser to register or log in, then you'll be redirected to the main app.

---

## Project Structure
cloud-file-intelligence/

├── backend/

│   ├── src/

│   │   ├── config/

│   │   │   └── env.ts

│   │   ├── controllers/

│   │   │   ├── authController.ts

│   │   │   └── analysisController.ts

│   │   ├── db/

│   │   │   └── database.ts

│   │   ├── middleware/

│   │   │   ├── authMiddleware.ts

│   │   │   └── rateLimiter.ts

│   │   ├── routes/

│   │   │   ├── authRoutes.ts

│   │   │   └── analysisRoutes.ts

│   │   ├── services/

│   │   │   ├── aiService.ts

│   │   │   ├── authService.ts

│   │   │   └── cloudService.ts

│   │   ├── types/

│   │   │   └── index.ts

│   │   └── app.ts

│   ├── intelligence.db

│   ├── tsconfig.json

│   └── package.json

├── frontend/

│   ├── auth.html

│   └── index.html

├── .gitignore

└── README.md
---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/` | Server health check | No |
| POST | `/auth/register` | Create new account | No |
| POST | `/auth/login` | Login | No |
| GET | `/auth/me` | Get current user | Yes |
| POST | `/analyze` | Analyze a single file | Yes |
| POST | `/analyze-multiple` | Analyze up to 5 files at once | Yes |
| GET | `/history` | Get analysis history | Yes |
| GET | `/search?q=...` | Search history | Yes |
| DELETE | `/file/:publicId` | Delete file from Cloud | Yes |

---

## Roadmap

- [x] Phase 1 — UI and file upload
- [x] Phase 2 — AI integration
- [x] Phase 3 — Node.js backend
- [x] Phase 4 — Cloud storage with Cloudinary
- [x] Phase 5 — SQLite database
- [x] Phase 6 — User authentication
- [x] Phase 7 — TypeScript migration & Clean Architecture
- [ ] Phase 8 — File categorization / tagging
- [ ] Phase 9 — Docker & deployment
- [ ] Phase 10 — Automated testing

---

## Developer

Built by **Ali Mohammadi**

---

## License

MIT License