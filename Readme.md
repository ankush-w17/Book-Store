# Book Store

An online bookstore where you can browse books, add them to your cart, and place orders. Built with React and Express.

## Features

- Browse and search books
- Shopping cart and wishlist
- User authentication (email/password + Google OAuth)
- Order management
- Book reviews and ratings
- Save multiple addresses

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router  
**Backend:** Node.js, Express, MongoDB  
**Auth:** JWT + Google OAuth

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repo and install dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

2. Set up environment variables:

Create a `.env` file in the `backend` folder:

```
URI=your_mongodb_connection_string
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
PORT=5000
```

3. Seed the database (optional):

```bash
cd backend
node seeder.js
```

### Running the App

Start both servers in separate terminals:

```bash
# Backend (runs on port 5000)
cd backend
npm run dev

# Frontend (runs on port 5173)
cd frontend
npm run dev
```

Then open http://localhost:5173 in your browser.

## API Endpoints

The backend exposes REST APIs at `http://localhost:5000/api`:

- `/auth` - Registration, login, profile
- `/books` - Book catalog
- `/cart` - Shopping cart operations
- `/orders` - Order placement and history
- `/reviews` - Book reviews
- `/addresses` - Saved addresses
- `/wishlist` - Wishlist management

Most endpoints require authentication via JWT token in the Authorization header.
