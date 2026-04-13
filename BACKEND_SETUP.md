# Backend Setup Guide

## Prerequisites
- Node.js (v16+)
- PostgreSQL (local or cloud - Supabase, etc.)
- npm or yarn

## Step 1: Create Database

### Option A: Local PostgreSQL
```bash
# On Windows (using psql)
psql -U postgres

# Create database
CREATE DATABASE edustream;
```

### Option B: Cloud Database (Supabase)
1. Go to [Supabase](https://supabase.com)
2. Create new project
3. Copy connection string from project settings

## Step 2: Configure Environment

1. Create `.env.local` file in project root:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your database URL:
```
DATABASE_URL=postgresql://username:password@localhost:5432/edustream
PORT=8787
```

## Step 3: Setup Database Tables

### Using SQL Client (pgAdmin/DBeaver/psql)
1. Open your PostgreSQL client
2. Copy-paste all queries from `SQL_QUERIES.md`
3. Execute them in order

**OR** the tables will auto-create when you start the server.

## Step 4: Insert Sample Data

1. Copy-paste sample data queries from `SQL_QUERIES.md`
2. Run them to populate initial data

## Step 5: Start Backend Server

```bash
npm run server
```

You'll see:
```
Supabase API server running on http://localhost:8787
```

## Step 6: Test the API

Use any REST client (Postman, Insomnia, VS Code Rest Client, curl, etc.)

### Test Health Check
```bash
GET http://localhost:8787/api/health
```

### Create a User
```bash
POST http://localhost:8787/api/users
Content-Type: application/json

{
  "email": "test@example.com",
  "name": "Test User",
  "role": "student"
}
```

### Get All Courses
```bash
GET http://localhost:8787/api/courses
```

---

## 📚 Full API Reference

See `SQL_QUERIES.md` for:
- All available endpoints
- Example requests/responses
- Database schema
- Useful query examples

---

## Troubleshooting

### Error: "DATABASE_URL is missing"
- Add `DATABASE_URL` to `.env.local`
- Restart the server

### Error: "Database connection failed"
- Verify PostgreSQL is running
- Check connection string in `.env.local`
- Ensure database exists

### CORS Issues
- The server already has CORS enabled
- Make sure both frontend and backend are running

### Port Already in Use
- Change `PORT` in `.env.local`
- Default is `8787`

---

## Running Both Frontend and Backend

**Terminal 1 - Frontend:**
```bash
npm run dev
# Runs on http://localhost:3000
```

**Terminal 2 - Backend:**
```bash
npm run server
# Runs on http://localhost:8787
```

Now your full-stack app is running!
