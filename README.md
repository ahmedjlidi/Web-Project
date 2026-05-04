## Instructions to Run StudyBuddy

This project uses a **local MongoDB database**.
The database files are included in the project folder under:

`/db`

### 1. Install MongoDB

```bash
sudo apt install -y mongodb-org
```

### 2. Start MongoDB

From the project root folder, run:

```bash
mongod --dbpath ./db --port 27017
```

Keep this terminal open.

### 3. Run the Backend

Open a new terminal:

```bash
cd backend
node server.js
```

### 4. Run the Frontend

Open another terminal from the project root:

```bash
npm run dev
```

### 5. Open the App

```
http://localhost:5173
```
