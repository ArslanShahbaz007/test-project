# Full Stack Application

This is a full-stack application with an Angular frontend, Node.js/Express backend, and MySQL database.

## Prerequisites

- Node.js and npm installed
- MySQL installed and running
- Angular CLI installed globally (`npm install -g @angular/cli`)

## Setup Instructions

### Database Setup

1. Create a new MySQL database named `test_db`
2. Update the database credentials in `/backend/.env`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will run on http://localhost:3000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   # use the proxy so /api calls are forwarded to the backend
   ng serve --proxy-config proxy.conf.json
   ```

The frontend will be available at http://localhost:4200

## Project Structure

```
/frontend          # Angular frontend application
  /src
    /app
      /components  # Angular components
  
/backend           # Node.js/Express backend
  /src
    server.ts      # Main server file
  .env            # Environment variables
```