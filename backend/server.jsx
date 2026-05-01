// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const User = require("./models/User");
// const Task = require("./models/Task");

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017/studybuddy")
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// app.get("/", (req, res) => {
//   res.send("Server is working!");
// });

// app.get("/api/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (err) {
//     console.log("TASK ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post("/api/tasks", async (req, res) => {
//   try {
//     const task = new Task(req.body);
//     await task.save();

//     res.status(201).json(task);
//   } catch (err) {
//     console.log("CREATE TASK ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.delete("/api/tasks/:id", async (req, res) => {
//   try {
//     const deletedTask = await Task.findByIdAndDelete(req.params.id);

//     if (!deletedTask) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     res.json({ message: "Task deleted successfully" });
//   } catch (err) {
//     console.log("DELETE TASK ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get("/profile", async (req, res) => {
//   try {
//     const user = await User.findOne().lean();
//     res.json(user || {});
//   } catch (err) {
//     console.log("PROFILE ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post("/profile", async (req, res) => {
//   try {
//     let user = await User.findOne();

//     if (!user) {
//       user = new User(req.body);
//     } else {
//       Object.assign(user, req.body);
//     }

//     await user.save();
//     res.json(user);
//   } catch (err) {
//     console.log("SAVE ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.put("/profile/email", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne();

//     if (!user) {
//       return res.status(404).json({ error: "No user found" });
//     }

//     if (!password) {
//       return res.status(400).json({ error: "Password required" });
//     }

//     if (password !== user.passwordHash) {
//       return res.status(400).json({ error: "Wrong password" });
//     }

//     user.email = email;
//     await user.save();

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(5001, () => {
//   console.log("Server running on port 5001");
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(5001, () => {
      console.log("Server running on port 5001");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });