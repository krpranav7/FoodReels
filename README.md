# FoodReels

FoodReels links viral food videos directly to their source. Scroll a short-video feed like Reels/TikTok, and tap through to order from the restaurant behind the video.

**Live app:** https://food-reels-black.vercel.app

## Features

- Short-video feed with autoplay-on-scroll (Instagram Reels-style)
- Separate auth flows for **users** and **food partners** (restaurants)
- Food partners can upload videos with a name and description
- Users can like, save, and comment on videos, with live counts
- Saved videos collected on a dedicated "Saved" page
- Food partner profile page showing their uploaded videos
- Food-partner-only pages (e.g. video upload) are protected on both frontend and backend
- JWT auth via HTTP-only cookies, with Google OAuth (Sign in with Google) as an additional login option

## Tech Stack

**Frontend:** React 19, React Router, Tailwind CSS, Vite, Axios, `@react-oauth/google`
**Backend:** Node.js, Express 5, MongoDB with Mongoose, Multer (file uploads)
**Storage:** ImageKit (video uploads/hosting)
**Auth:** JWT + HTTP-only cookies, Google OAuth 2.0 (Google Identity Services, verified via `google-auth-library`), bcrypt for password hashing

## Project Structure

```
FoodReels/
├── backend/
│   ├── server.js
│   └── src/
│       ├── app.js              # Express app, route mounting, 404 + global error handlers
│       ├── controllers/        # auth, food, food-partner
│       ├── db/                 # MongoDB connection
│       ├── middlewares/        # JWT auth middleware (user + food partner)
│       ├── models/             # user, foodpartner, food, likes, saves, comment
│       ├── routes/             # auth, food, food-partner
│       └── services/           # ImageKit upload service
└── frontend/
    └── src/
        ├── components/         # ReelFeed, BottomNav, ProtectedRoute,
        │                       # ProtectedFoodPartnerRoute, LoginRequired
        ├── pages/
        │   ├── auth/           # user & food partner register/login (with Google sign-in)
        │   ├── general/        # Home (feed), Saved
        │   └── food-partner/   # Profile, CreateFood (route-protected)
        └── routes/             # AppRoutes.jsx
```

## Getting Started

### Prerequisites

- Node.js
- A MongoDB database (e.g. MongoDB Atlas)
- An [ImageKit](https://imagekit.io) account (for video storage)
- A [Google Cloud](https://console.cloud.google.com) OAuth Client ID (Web application type) for Google sign-in

### Backend Setup

```bash
cd backend
npm install
```

Create a `backend/.env` file:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
FRONTEND_URL=http://localhost:5173
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `frontend/.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

```bash
npm run dev
```

## API Overview

**Auth** (`/api/auth`)
- `POST /user/register`, `POST /user/login`, `GET /user/logout`
- `POST /user/google` — sign in / sign up with a verified Google ID token
- `POST /food-partner/register`, `POST /food-partner/login`, `GET /food-partner/logout`
- `GET /user/me` — check current user session
- `GET /food-partner/me` — check current food partner session

**Food** (`/api/food`)
- `POST /` — upload a food video (food partner only, video file required, 50MB max)
- `GET /` — get all food items (user only)
- `POST /like` — like/unlike a food item
- `POST /save` — save/unsave a food item
- `GET /save` — get the current user's saved food items
- `POST /comment` — add a comment to a food item
- `GET /comment/:foodId` — get all comments for a food item, newest first

**Food Partner** (`/api/food-partner`)
- `GET /:id` — get a food partner's profile and their videos (public)

## License

ISC
