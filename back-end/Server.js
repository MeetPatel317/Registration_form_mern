const express = require("express");
const app = express();
const port = 8000;
const connectDB = require("./db/dbConnection");
const User = require("./db/user");
const cors = require('cors')
//Middleware for parsing json file
app.use(express.json());

// enable cors
app.use(cors());

//Registration
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Registration Successful" });
  } catch (err) {
    res.status(500).json({ message: "error occuers" });
  }
});

//Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid username Or password" });
    }
    res.status(200).json({ message: "login Successfull" });
  } catch (err) {
    re.status(500).json({ error: "login failed" });
  }
});

connectDB();

app.listen(port, () => {
  console.log("Server is listening on Port 8000");
});
