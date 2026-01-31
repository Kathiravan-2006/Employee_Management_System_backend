require("dotenv").config();
const express = require("express");
const cors = require("cors");

const employeeRouter = require("./routes/employee");
const authRouter = require("./routes/auth");

// Database connection
const createDB = require("./config/db");
createDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.json("Employee Management Backend Running");
});

// Routes
app.use("/api/employees", employeeRouter);
app.use("/api/auth", authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});
