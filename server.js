require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const studentRoutes = require("./routes/studentRoutes");
const classroomRoutes = require("./routes/classroomRoutes");

app.use("/api/students", studentRoutes);
app.use("/api/classrooms", classroomRoutes);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
