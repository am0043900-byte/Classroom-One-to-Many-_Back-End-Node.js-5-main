const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter student name"]
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    required: [true, "Please enter student email"]
  }
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
