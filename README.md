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

3. Create a `.env` file in the `backend` directory with the following content:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=test_db
   PORT=3000
   ```

4. Start the backend server:
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


Registration Status Dashboard - Full Stack Application
  Project Overview
A full-stack application that tracks and visualizes registration status counts with date filtering capabilities. The system provides a dashboard to view status distribution across different dates.

  Scope
Backend Scope
RESTful API for registration status data

MySQL database integration

CSV data seeding functionality

Status count aggregation endpoints

Date-based filtering capabilities

Frontend Scope
Interactive dashboard for status visualization (Angular)

Date picker for filtering data

Responsive card-based display

Real-time data updates

Modern UI with status icons and color coding

  Architecture
System Architecture
text
Angular Frontend → Express.js API → MySQL Database
Technology Stack
Frontend: Angular 17+ (Standalone Components), Signals, RxJS

Backend: Node.js, Express.js, MySQL2

Database: MySQL

Styling: Component-scoped CSS

Environment: dotenv for configuration

🗄️ Database Design
Table: registration_status_history
Column Name	Data Type	Constraints	Description
REGISTRATION_STATUS_ID	BIGINT	PRIMARY KEY	Unique identifier for status history record
REGISTRATION_ID	BIGINT	-	Reference to registration record
STATUS	VARCHAR(255)	-	Current status of registration
DATE_CREATED	DATE	-	Date when status was recorded
Table Creation Query
sql
CREATE TABLE IF NOT EXISTS registration_status_history (
  REGISTRATION_STATUS_ID BIGINT PRIMARY KEY,
  REGISTRATION_ID BIGINT,
  STATUS VARCHAR(255),
  DATE_CREATED DATE
);
  Sample Data
The system expects CSV data in this format:


URL: GET /api/test

Purpose: Verify backend is running

Response:

json
{
  "message": "Backend is working!"
}
2. Get Status Counts
URL: GET /api/status-counts?date=YYYY-MM-DD

Parameters:

date (optional): Filter by specific date in YYYY-MM-DD format

Response:

json
[
  {
    "status": "COMPLETED",
    "count": 150
  },
  {
    "status": "PENDING",
    "count": 75
  },
  {
    "status": "REJECTED",
    "count": 25
  }
]
🚀 Local Setup Instructions
Prerequisites
Node.js (v18 or higher)

MySQL Server (v8.0 or higher)

npm or yarn

Angular CLI (npm install -g @angular/cli)

Step 1: Clone and Setup Project Structure
bash
# Create project directory (if not already created)
mkdir registration-dashboard
cd registration-dashboard
Step 2: Database Setup
Start MySQL server

bash
# On macOS with Homebrew
brew services start mysql

# On Windows
# Start MySQL Service from Services panel
Login to MySQL and create database

bash
mysql -u root -p
sql
CREATE DATABASE test_db;
USE test_db;

-- Verify the database was created
SHOW DATABASES;
Update backend environment configuration
Create /backend/.env file:

env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=test_db
CSV_PATH=./data/TABLES(REGISTRATION STATUS HISTORY).csv
Step 3: Backend Setup
Navigate to backend directory and install dependencies

bash
cd backend
npm install
Prepare CSV data

bash
# Create data directory and place your CSV file
mkdir -p data
# Copy your "TABLES(REGISTRATION STATUS HISTORY).csv" file to ./data/
Run database seeder

bash
npm run seed
Start the backend server

bash
# For development with auto-restart
npm run dev

# Or for production
npm start
Verify backend is running:

Visit: http://localhost:3000/api/test

Should see: {"message":"Backend is working!"}

Step 4: Frontend Setup
Navigate to frontend directory and install dependencies

bash
cd ../frontend
npm install
Configure proxy for API calls
Create or verify proxy.conf.json in frontend directory:

json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true
  }
}
Start the frontend development server

bash
ng serve --proxy-config proxy.conf.json
Access the application:

Frontend: http://localhost:4200

Backend API: http://localhost:3000

📁 Complete File Structure
text
registration-dashboard/
├── backend/
│   ├── src/
│   │   ├── app.js (main Express app)
│   │   ├── db.js (database connection)
│   │   └── seed.js (data seeder)
│   ├── data/
│   │   └── TABLES(REGISTRATION STATUS HISTORY).csv
│   ├── .env
│   ├── package.json
│   └── README.md
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── dashboard.component.ts
    │   │   │   ├── status-card.component.ts
    │   │   │   ├── search-bar.component.ts
    │   │   │   └── navbar.component.ts
    │   │   ├── services/
    │   │   │   └── status.service.ts
    │   │   └── app.config.ts
    │   ├── index.html
    │   └── styles.css
    ├── proxy.conf.json
    ├── package.json
    ├── angular.json
    └── README.md
🔧 Configuration Files
Backend package.json
json
{
  "name": "registration-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "seed": "node src/seed.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "mysql2": "^3.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
Frontend package.json (Angular)
json
{
  "name": "registration-frontend",
  "version": "1.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve --proxy-config proxy.conf.json",
    "build": "ng build",
    "test": "ng test"
  },
  "dependencies": {
    "@angular/animations": "^17.0.0",
    "@angular/common": "^17.0.0",
    "@angular/compiler": "^17.0.0",
    "@angular/core": "^17.0.0",
    "@angular/forms": "^17.0.0",
    "@angular/platform-browser": "^17.0.0",
    "@angular/platform-browser-dynamic": "^17.0.0",
    "@angular/router": "^17.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.0"
  },
  "devDependencies": {
    "@angular/cli": "^17.0.0",
    "@angular/compiler-cli": "^17.0.0",
    "typescript": "~5.2.0"
  }
}
🎨 Frontend Components
DashboardComponent
Main dashboard layout with status cards

Date filtering functionality

Responsive grid layout

Status icon and color mapping

StatusCardComponent
Individual status display cards

Visual indicators with icons

Color-coded status representation

SearchBarComponent & NavbarComponent
Navigation and search functionality

Enhanced user interface

🔄 Development Workflow
Initial Setup

bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
ng serve --proxy-config proxy.conf.json
Database Updates

Modify CSV data in backend/data/

Run npm run seed in backend directory

Restart backend if needed

Frontend Development

Components use Angular standalone architecture

Services for API communication

Reactive programming with RxJS

🐛 Troubleshooting
Common Issues
MySQL Connection Error

bash
# Verify MySQL is running
brew services list  # macOS
# or check Windows Services

# Test connection
mysql -u root -p -e "SHOW DATABASES;"
Backend Port Already in Use

bash
# Kill process on port 3000
npx kill-port 3000
# Or change PORT in backend/.env
Frontend Build Issues

bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
CORS/Proxy Issues

Backend includes CORS middleware

Frontend uses proxy for development

Verify proxy.conf.json configuration

CSV File Not Found

bash
# Check file path and update CSV_PATH in .env
ls -la backend/data/
Verification Steps
Backend API Test

bash
curl http://localhost:3000/api/test
# Should return: {"message":"Backend is working!"}
Database Connection Test

bash
curl "http://localhost:3000/api/status-counts"
# Should return JSON array of status counts
Frontend Accessibility

Open http://localhost:4200 in browser

Should see "Daily Workload Dashboard"

Status cards should display data

📈 Sample Queries
Get counts for specific date
sql
SELECT STATUS as status, COUNT(*) as count 
FROM registration_status_history 
WHERE DATE_CREATED = '2024-01-15' 
GROUP BY STATUS 
ORDER BY count DESC;
Get all-time counts
sql
SELECT STATUS as status, COUNT(*) as count 
FROM registration_status_history 
GROUP BY STATUS 
ORDER BY count DESC;
🚀 Production Deployment Notes
Build frontend: ng build --configuration production

Set production environment variables

Use process manager like PM2 for backend

Configure reverse proxy (nginx/Apache)

Set up production database with proper credentials

This comprehensive setup provides a complete full-stack application with Angular frontend, Express.js backend, and MySQL database for tracking and visualizing registration status data.

# Test Project

## Project Overview
This project consists of a frontend built with Angular and a backend built with Node.js and Express. The backend uses MySQL as the database. The application provides APIs for querying registration status counts and a frontend interface for interacting with the data.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MySQL database

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following content:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=test_db
   PORT=3000
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
4. Open your browser and navigate to `http://localhost:4200/`.

## Database Design
The database contains the following table:

### `registration_status_history`
| Column Name   | Data Type | Description                     |
|---------------|-----------|---------------------------------|
| STATUS        | VARCHAR   | Status of the registration.     |
| DATE_CREATED  | DATE      | Date when the status was created. |

### Relationships
- The `registration_status_history` table is used to store historical data of registration statuses.

## API Endpoints

### `GET /api/test`
- **Description**: Health check endpoint.
- **Response**:
  ```json
  {
    "message": "Backend is working!"
  }
  ```

### `GET /api/status-counts?date=YYYY-MM-DD`
- **Description**: Returns counts per status for the provided date. If the date is omitted, returns counts across all dates.
- **Response**:
  ```json
  [
    {
      "status": "Active",
      "count": 10
    },
    {
      "status": "Inactive",
      "count": 5
    }
  ]
  ```

## Architecture

### Backend
- **Framework**: Node.js with Express
- **Database**: MySQL
- **Key Files**:
  - `src/server.ts`: Main server file.
  - `src/db.ts`: Database connection setup.

### Frontend
- **Framework**: Angular
- **Key Files**:
  - `src/app/app.ts`: Main application module.
  - `src/app/components`: Contains reusable components like `dashboard`, `navbar`, etc.

## Functionalities
- Query registration status counts by date.
- Display data in a user-friendly interface.
- Health check endpoint for backend verification.