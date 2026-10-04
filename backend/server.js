const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("MERN Backend is Running Successfully");
});

// Example API
app.get("/api/students", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Amit",
      course: "BCA"
    },
    {
      id: 2,
      name: "Sneha",
      course: "BCA"
    }
  ]);
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});