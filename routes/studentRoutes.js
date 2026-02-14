const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// POST Student
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      data: student
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE Student
router.delete("/:id", async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  res.json({
    success: true,
    message: "Student deleted"
  });
});

module.exports = router;
