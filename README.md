# Task Reminder App

Simple demo stack for assigning and completing tasks. The backend is an Express + MongoDB API, while the newly added frontend is a lightweight Vite + React dashboard so you can interact with the API without Postman or cURL.

## Backend

```
cd server
npm install
npm run dev
```

Environment variables required inside `server/.env`:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=super_secret
```

## Frontend

```
cd client
npm install
npm run dev
```

By default the UI calls `http://localhost:5000/api`. Override with `VITE_API_BASE_URL` inside `client/.env`.

The dashboard exposes five cards:

- Register user (optionally admin)
- Login to retrieve/stash the issued JWT
- Assign task (admin-only)
- Update task details
- Mark task completed

Tokens are cached in `localStorage` for the current browser. Log out/clear using the button in the hero panel.
