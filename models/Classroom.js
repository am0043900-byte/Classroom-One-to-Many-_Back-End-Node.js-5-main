const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter classroom name"]
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }
  ]
});

const Classroom = mongoose.model("Classroom", classroomSchema);
module.exports = Classroom;