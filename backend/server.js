const express = require("express");     // tool to build server
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./models/User");

/*
const app = express();  // create server
app.use(cors());
app.use(express.json());
*/
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// connect server to database
mongoose.connect("mongodb://127.0.0.1:27017/studybuddy")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// test route
app.get("/", (req, res) => {        //hoempage
  res.send("Server is working!");
});

// get profile
app.get("/profile", async (req, res) => {
  try {
    const user = await User.findOne().lean(); // just get latest user
    res.json(user || {});
  } catch (err) {
    console.log("PROFILE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
// save profile
app.post("/profile", async (req, res) => {
  try {
    let user = await User.findOne();   // lways get first user

    if (!user) {
      user = new User(req.body);       // create first time
    } else {
      /*
      user.name = req.body.name;
      user.email = req.body.email;
      user.sessionLength = req.body.sessionLength;
      user.studyTime = req.body.studyTime;
      user.accuracy = req.body.accuracy;
      

      Object.assign(user, req.body);

      if (req.body.passwordHash) {
        user.passwordHash = req.body.passwordHash;
      }
      */

      Object.assign(user, req.body);
    }

    await user.save();

    res.json(user);
  } catch (err) {
    console.log("SAVE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// update profile
app.put("/profile/email", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne();

    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    if (!password) {
      return res.status(400).json({ error: "Password required" });
    }

    if (password !== user.passwordHash) {
      return res.status(400).json({ error: "Wrong password" });
    }

    user.email = email;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
