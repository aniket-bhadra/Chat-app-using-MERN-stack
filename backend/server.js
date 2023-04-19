const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("Api is running successfully");
});

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`.yellow.bold));
