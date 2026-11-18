# Golden Ticket Drop

A full-stack ticket booking application built using React, TypeScript, Node.js and Express. Users can view event details, check ticket availability and purchase tickets. The backend manages ticket inventory and prevents overselling through concurrency control.

## Technologies Used

### Frontend

- React
- TypeScript
- Vite
- Bootstrap 5
- CSS

### Backend

- Node.js
- Express.js
- TypeScript
- JSON file storage (Data Store)

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Jaison06/golden-ticket.git

```

### 2. Set up the backend

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend development server:

```bash
npm run dev
```

### 3. Set up the frontend

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The project was checked using `npm audit`.

The audit identified four high-severity findings associated with `picomatch@4.0.7`, an indirect development dependency used through Vite.

The production dependency audit (`npm audit --omit=dev`) reported zero vulnerabilities.

At the time of submission, no newer `picomatch` version was available. The issue has been reviewed, and dependency updates will be applied when a compatible security fix becomes available.

The API base URL is currently configured directly in src/api/ticketApi.ts.

const API_URL = "http://localhost:3000/api";

Update the URL according to your local backend configuration.

Open the frontend URL displayed in the terminal, usually:

```text
http://localhost:5173
```

## API Endpoints

| Method | Endpoint         | Description                            |
| ------ | ---------------- | -------------------------------------- |
| GET    | `/api/inventory` | Retrieve event and ticket availability |
| POST   | `/api/buy`       | Purchase tickets and update inventory  |

## Key Features

- Display event information and ticket availability.
- Purchase tickets through a REST API.
- Update ticket inventory after successful purchases.
- Prevent overselling using backend concurrency control.
- Handle sold-out events and purchase errors.
- Display purchase confirmation and ticket ID.
- The client sends a POST request to the API with the ticket quantity. The implementation supports purchasing multiple tickets in a single request in the future.

## Future Improvements

- Add environment variables (.env) in a later stage
- Replace JSON file storage with a database.
- Add automated unit and integration tests.
- Add user authentication and booking history.
- Real-time inventory updates (later stage): Implement Server-Sent Events (SSE) to automatically push ticket inventory updates to all connected browsers without requiring a page refresh.
