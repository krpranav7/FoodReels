# FoodReels

FoodReels links viral food videos directly to their source. Scroll a short-video feed like Reels/TikTok, and tap through to order from the restaurant behind the video.

**Live app:** https://food-reels-black.vercel.app

## Features

- Short-video feed with autoplay-on-scroll (Instagram Reels-style)
- Separate auth flows for **users** and **food partners** (restaurants)
- Food partners can upload videos with a name and description
- Users can like and save videos, with live like/save counts
- Saved videos collected on a dedicated "Saved" page
- Food partner profile page showing their uploaded videos
- JWT auth via HTTP-only cookies

## Tech Stack

**Frontend:** React 19, React Router, Tailwind CSS, Vite, Axios
**Backend:** Node.js, Express 5, MongoDB with Mongoose
**Storage:** ImageKit (video uploads/hosting)
**Auth:** JWT + HTTP-only cookies, bcrypt for password hashing

## Project Structure

```
FoodReels/
├── backend/
│   ├── server.js
│   └── src/
│       ├── app.js              # Express app, route mounting
│       ├── controllers/        # auth, food, food-partner
│       ├── db/                 # MongoDB connection
│       ├── middlewares/        # JWT auth middleware
│       ├── models/             # user, foodpartner, food, likes, saves
│       ├── routes/             # auth, food, food-partner
│       └── services/           # ImageKit upload service
└── frontend/
    └── src/
        ├── components/         # ReelFeed, BottomNav, ProtectedRoute, LoginRequired
        ├── pages/
        │   ├── auth/           # user & food partner register/login
        │   ├── general/        # Home (feed), Saved
        │   └── food-partner/   # Profile, CreateFood
        └── routes/             # AppRoutes.jsx
```

## Getting Started

### Prerequisites

- Node.js
- A MongoDB database (e.g. MongoDB Atlas)
- An [ImageKit](https://imagekit.io) account (for video storage)

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
```

```bash
npm run dev
```

## API Overview

**Auth** (`/api/auth`)
- `POST /user/register`, `POST /user/login`, `GET /user/logout`
- `POST /food-partner/register`, `POST /food-partner/login`, `GET /food-partner/logout`
- `GET /user/me`

**Food** (`/api/food`)
- `POST /` — upload a food video (food partner only)
- `GET /` — get all food items (user only)
- `POST /like` — like/unlike a food item
- `POST /save` — save/unsave a food item
- `GET /save` — get the current user's saved food items

**Food Partner** (`/api/food-partner`)
- `GET /:id` — get a food partner's profile and their videos

## License

ISC
