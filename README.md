# PERN Stack Learning Project

A simple **PERN** stack web application built for learning purposes, using:

- PostgreSQL for the database
- Express.js and Node.js for the backend REST API
- React (with Vite) for the frontend
- Drizzle ORM 

This project helped me practice full‑stack concepts: database design, REST APIs, and a React UI working together end‑to‑end. [web:110][web:112][web:116][web:120]

---

## Tech Stack

**Frontend**

- React
- Vite
- JavaScript
- Fetch for API calls

**Backend**

- Node.js
- Express.js
- Drizzle ORM 
- PostgreSQL

---

## Getting Started

### Prerequisites

- Node.js (LTS)
- npm or pnpm or yarn
- PostgreSQL running locally (or a cloud instance like Supabase/Neon)

### 1. Clone the repository

```bash
git clone <your-repo-url>.git
cd <your-project-root>
```

### 2.Backend Setup

```bash
cd backend               # or server, api, etc.
npm install
```
Create a .env file in the backend folder:

```text
DATABASE_URL=postgres://<user>:<password>@localhost:5432/<db_name>
PORT=3000
NODE_ENV=development
```
Run database migrations / schema sync (if using Drizzle or similar):

```bash
# Example for Drizzle (edit to match your setup)
npm run db:generate
npm run db:migrate
```
Start the backend:

```bash
npm run dev     # or: npm start / nodemon server.js
```

The API should be available at:

```text
http://localhost:3000
```

### 3. Frontend setup
```bash
cd ../frontend          # or client, ui, etc.
npm install
npm run dev
```

Open the URL printed by Vite, usually:

```text
http://localhost:5173
```
