# StudyBuddy

StudyBuddy is a web application for students to manage study tasks, run focus sessions, and review study analytics.

The system connects planned study work with actual study behavior. Users can create tasks, estimate their duration, start focus sessions, record progress, and view analytics such as study time, estimation bias, focus rating, satisfaction rating, and interruptions.

---

## Main Features

### Authentication

- User signup and login
- Password hashing on the backend
- JWT token generation after login
- Protected backend routes using authentication middleware
- User and admin roles

### Task Management

- Create study tasks
- View pending, active, completed, and overdue tasks
- Track task progress
- Mark tasks as completed
- Delete tasks
- Store task data in MongoDB

### Focus Sessions

- Start and stop a study session for a selected task
- Record session duration
- Record progress before and after the session
- Record focus rating
- Record satisfaction rating
- Record number of interruptions
- Save session data to MongoDB

### Analytics

- Total tasks
- Completed tasks
- Active tasks
- Total study time
- Average focus
- Average satisfaction
- Total interruptions
- Estimation bias
- Estimated vs actual study time
- Session duration vs preferred session length
- Daily study goal vs actual study time
- Time filtering: today, this week, this month, and all time

### Profile Settings

- Update username
- Upload or remove avatar
- Update password
- Set preferred session length
- Set average daily study time
- Set self-rated time estimation accuracy

---

## Technology Stack

### Frontend

- React
- Vite
- React Router
- Recharts
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

---

## Project Structure

```txt
Web-Project/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   ├── studySessionController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── StudySession.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── taskRoutes.js
│   │   └── studySessionRoutes.js
│   │
│   ├── server.js
│   └── .env
│
├── db/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── README.md
```

---

## Database Collections

The database uses three main collections.

### User

Stores account information and study preferences.

Main fields:

```txt
username
email
passwordHash
role
avatar
preferredSessionLength
averageDailyStudyTime
accuracy
```

### Task

Stores planned study tasks.

Main fields:

```txt
userID
title
estimatedDuration
deadline
difficulty
priority
category
notes
currentProgress
completedAt
createdAt
updatedAt
```

### StudySession

Stores completed focus session data.

Main fields:

```txt
taskID
userID
startTime
endTime
duration
progressBefore
progressAfter
focusRating
satisfactionRating
interruptions
createdAt
updatedAt
```

Each study session belongs to one user and one task.

---

# Instructions to Run StudyBuddy

## 1. Clone the Project

```bash
git clone https://github.com/ahmedjlidi/Web-Project
cd Web-Project
```

---

## 2. Install Dependencies

From the project root folder, install frontend dependencies:

```bash
npm install
```

Then install backend dependencies:

```bash
cd backend
npm install
cd ..
```

---

## 3. Install MongoDB

For Ubuntu or WSL:

```bash
sudo apt install -y mongodb-org
```

---

## 4. Create Backend Environment File

Inside the `backend` folder, create a `.env` file:

```bash
cd backend
touch .env
```

Add the following:

```env
MONGO_URI=mongodb://127.0.0.1:27017/studybuddy
JWT_SECRET=your_secret_key_here
PORT=3501
```

Then return to the project root:

```bash
cd ..
```

---

## 5. Start MongoDB

You can start MongoDB in one of two ways.

### Option A: Use the included local database folder

From the project root folder, run:

```bash
mongod --dbpath ./db --port 27017
```

Keep this terminal open.

### Option B: Start MongoDB as a system service

Run:

```bash
sudo systemctl start mongod
```

To check if MongoDB is running:

```bash
sudo systemctl status mongod
```

---

## 6. Run the Backend

Open a new terminal:

```bash
cd backend
node server.js
```

Expected output:

```txt
Connected to MongoDB
Server running on port 3501
```

---

## 7. Run the Frontend

Open another terminal from the project root:

```bash
npm run dev
```

---

## 8. Open the App

Open this URL in the browser:

```txt
http://localhost:5173
```

---

# API Overview

## Authentication Routes

### Register User

```txt
POST /api/auth/register
```

Example body:

```json
{
  "username": "student",
  "email": "student@gmail.com",
  "password": "Password@123"
}
```

### Login User

```txt
POST /api/auth/login
```

Example body:

```json
{
  "loginIdentifier": "student@gmail.com",
  "password": "Password@123"
}
```

Successful login returns a JWT token. The frontend stores this token and sends it with protected requests.

---

## Protected Request Format

Protected routes require the JWT token in the request header:

```txt
Authorization: Bearer TOKEN_HERE
```

Example:

```bash
curl -X GET http://localhost:3501/api/tasks \
-H "Authorization: Bearer TOKEN_HERE"
```

The backend middleware verifies the token before allowing access to protected routes. This prevents the frontend from manually sending arbitrary user IDs.

---

## Task Routes

### Get Tasks

```txt
GET /api/tasks
```

Returns tasks for the logged-in user. Admin users can view all tasks.

### Create Task

```txt
POST /api/tasks
```

Example body:

```json
{
  "title": "Operating Systems",
  "estimatedDuration": 90,
  "difficulty": 5,
  "deadline": "2026-03-03",
  "priority": 3,
  "category": "Studying",
  "notes": "Study scheduling chapter"
}
```

### Update Task

```txt
PUT /api/tasks/:id
```

### Update Task Progress

```txt
PATCH /api/tasks/:id/progress
```

Example body:

```json
{
  "progress": 100
}
```

### Delete Task

```txt
DELETE /api/tasks/:id
```

---

## Study Session Routes

### Get Study Sessions

```txt
GET /api/sessions
```

Returns study sessions for the logged-in user.

### Create Study Session

```txt
POST /api/sessions
```

Example body:

```json
{
  "taskID": "taskId",
  "startTime": "2026-03-02T18:00:00",
  "endTime": "2026-03-02T18:45:00",
  "duration": 45,
  "progressBefore": 0,
  "progressAfter": 30,
  "focusRating": 4,
  "satisfactionRating": 3,
  "interruptions": 1
}
```

The backend saves the session and updates the related task progress.

---

## Profile Routes

### Get Profile

```txt
GET /api/profile/me
```

Returns the logged-in user profile.

### Update Profile

```txt
PUT /api/profile/me
```

Example body:

```json
{
  "username": "student",
  "avatar": "",
  "preferredSessionLength": 45,
  "averageDailyStudyTime": 120,
  "accuracy": 80
}
```

---

# Analytics Calculations

Analytics are calculated from task and study session records.

Examples:

```txt
Total Study Time = sum of all session durations
Average Focus = sum of focus ratings / number of sessions
Average Satisfaction = sum of satisfaction ratings / number of sessions
Total Interruptions = sum of interruptions across sessions
Estimation Bias = actual task duration - estimated task duration
Measured Accuracy = 100 - percentage estimation error
Daily Goal Progress = daily study time / average daily study time
```

Study preferences from the user profile are used as comparison targets:

```txt
preferredSessionLength
averageDailyStudyTime
accuracy
```

These values are fetched from the logged-in user profile.

---

# Manual Database Inspection

Open MongoDB shell:

```bash
mongosh
```

Select the database:

```js
use studybuddy
```

Show collections:

```js
show collections
```

View users:

```js
db.users.find().pretty()
```

View tasks:

```js
db.tasks.find().pretty()
```

View study sessions:

```js
db.studysessions.find().pretty()
```

Clear a specific collection:

```js
db.studysessions.deleteMany({})
```

---

# Common Issues

## Backend cannot find a route or controller

Check that the file exists and the name matches exactly.

Linux is case-sensitive. These are different:

```txt
studySessionRoutes.js
StudySessionRoutes.js
studysessionRoutes.js
```

## MongoDB connection refused

Make sure MongoDB is running.

Using local database folder:

```bash
mongod --dbpath ./db --port 27017
```

Using system service:

```bash
sudo systemctl start mongod
```

## 404 on API request

Check that the route is mounted in `server.js`.

Example:

```js
app.use("/api/sessions", studySessionRoutes);
```

## Not authorized, no token

The frontend did not send the JWT token.

Check that the request includes:

```js
Authorization: `Bearer ${sessionStorage.getItem("token")}`
```

## No data appears in analytics

Check if study sessions exist:

```js
db.studysessions.find().pretty()
```

If no sessions exist, the analytics page has no session records to calculate from.

---

# Team Members

- Shahd Derbass
- Rahma Hamed
- Ahmed Jlidi
