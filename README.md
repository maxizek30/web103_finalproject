# MovieTrackr

CodePath WEB103 Final Project

Designed and developed by: Max Lopez, Tommy Nguyen

🔗 Link to deployed app:

## About

### Description and Purpose

MovieTrackr is a simple movie tracking app that lets users manage their movie watchlist. It provides a preset table of movies to explore and allows users to add their own selections from the web. Users can mark movies as "watched" and track their progress. This app is designed for movie lovers who want a streamlined way to keep track of films they plan to see, without the distraction of ratings and reviews.

### Inspiration

The app is inspired by platforms like Letterboxd, where users can maintain a watchlist of movies. However, MovieTrackr simplifies the experience by removing ratings, reviews, and social features to focus solely on tracking movies. It's for users who prefer a minimalistic way of managing their movie lists.

## Tech Stack

Frontend:

- React.js and Vite for building interactive UI components.
- Axios for API requests to fetch movies

Backend:

- Node.js with Express for server-side logic.
- Railway Postgres SQL for storing user data, including movies and watchlist status.
- RESTful API to handle user data between sessions.

## Features

### Preset Movie Table ✅

A curated list of preloaded movies that users can browse and add to their watchlist.

![demo of preset movie tables](./gifs/presetMovies.gif)

### Custom Movie Add-on ✅

Users can search for movies online and add them to their watchlist or watched list, expanding their collection beyond the preset options.

![demo of custom movie form](./gifs/customMovie.gif)

### Watchlist Tracking ✅

Users can manage their watchlists in detail:

- View, add, and remove movies they want to watch.
- Mark movies as "watched" and keep track of their progress.
- The app saves and syncs this data between sessions, allowing users to continue from where they left off.

![demo of watchlist tracking](./gifs/watchlistTracking.gif)

### User Authentication ✅

Users can create accounts and log in, ensuring their movie lists and preferences are saved and accessible across different sessions and devices.

![demo of user authentication tables](./gifs/authExample.gif)

## Installation Instructions

Follow these steps to install and run the application locally:

---

#### 1. **Clone the Repository**

```bash
git clone <repository-url>
cd <repository-name>
```

---

#### 2. **Set Up the Client (Frontend)**

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` directory:

   ```bash
   touch .env
   ```

4. Add the required environment variables to the `.env` file. Example:

   ```plaintext
   VITE_API_URL=http://localhost:3001
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

---

#### 3. **Set Up the Server (Backend)**

1. Navigate to the `server` directory:

   ```bash
   cd ../server
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory:

   ```bash
   touch .env
   ```

4. Add the required environment variables to the `.env` file. Example:

   ```plaintext
   PGDATABASE=railway
   PGHOST=autorack.example.new
   PGPASSWORD=000000
   PGPORT=000000
   PGUSER=postgres
   GITHUB_CLIENT_ID=000000
   GITHUB_CLIENT_SECRET=000000
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

---

#### 4. **Access the Application**

1. Open your browser and navigate to the frontend development server URL (e.g., `http://localhost:5173`).
2. Ensure the backend server is running on the specified port (e.g., `http://localhost:3001`).

---

#### 5. **Notes**

- Ensure that both the frontend and backend `.env` files have the correct variables.
- If you encounter issues, check that your database and backend services are configured correctly.
