# Message Mitra (మెసేజ్ మిత్ర / मैसेज मित्र)
> Understand every message. Stay safe.

A beautiful, mobile-first web app (installable as PWA) that helps rural people, elders, and non-English speakers understand phone SMS messages safely. 

## 📂 Project Structure

| Folder/File | Description |
|---|---|
| `client/` | React.js (Vite) frontend application |
| `client/src/components/` | Reusable UI components (Navbar, BottomNav, ProtectedRoute) |
| `client/src/pages/user/` | User-facing pages (Landing, Login, Register, Home, Result, Saved, Family) |
| `client/src/pages/admin/` | Admin portal pages (Dashboard, Users, Messages, ScamPatterns, Reports) |
| `client/src/i18n/` | Local translation files (English, Telugu, Hindi) for fast, offline support |
| `server/` | Node.js + Express backend |
| `server/config/` | Database configuration (MongoDB) |
| `server/models/` | Mongoose schemas (User, Message, SavedMessage, ScamPattern, etc.) |
| `server/routes/` | API endpoints (Auth, Analyze, Admin, Family, Reports) |
| `server/utils/` | Core logic for Rule-based classification and Fraud detection without paid APIs |
| `server/seed.js` | Script to populate the database with a default Admin and Scam patterns |

## 🚀 Installation & Run Steps

### Prerequisites
- Node.js installed
- MongoDB running locally (or update the `.env` with a cloud Mongo URI)

### Backend Setup
1. Open a terminal and navigate to the server folder:
   ```bash
   cd message-mitra/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` (or create a `.env` file):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/messagemitra
   JWT_SECRET=supersecretjwtkey_message_mitra_2026
   ```
4. Seed the database (Creates default admin & scam rules):
   ```bash
   node seed.js
   ```
5. Start the backend server:
   ```bash
   node server.js
   ```
   *(Runs on http://localhost:5000)*

### Frontend Setup
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd message-mitra/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(Runs on http://localhost:3000)*

## 🔐 Default Admin Credentials
- **Phone:** `0000000000`
- **Password:** `Admin@123`

---
Built for safety and accessibility.
