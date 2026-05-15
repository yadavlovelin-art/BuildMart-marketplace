# BuildMart 🏗️

Construction Materials Supplier — NCR & Haryana

## Project Structure

```
BuildMart/
├── frontend/   → Next.js 14 + Tailwind CSS  → Deploy on Vercel
└── backend/    → Express.js + MongoDB        → Deploy on Render
```

## Quick Deploy

1. Deploy backend on [Render](https://render.com) — root dir: `backend`
2. Deploy frontend on [Vercel](https://vercel.com) — root dir: `frontend`
3. Set environment variables (see `.env.example` in each folder)

## Environment Variables

### Backend (Render)
- `MONGO_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — Random secret for JWT tokens
- `ADMIN_SETUP_KEY` — Key to register admin user
- `CLIENT_URL` — Your Vercel frontend URL

### Frontend (Vercel)
- `NEXT_PUBLIC_API_URL` — Your Render backend URL + `/api`
