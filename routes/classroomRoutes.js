const express = require("express");
const router = express.Router();
const Classroom = require("../models/Classroom");

// POST Classroom
router.post("/", async (req, res) => {
  try {
    const classroom = await Classroom.create(req.body);

    res.status(201).json({
      success: true,
      data: classroom
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// GET Classrooms
router.get("/", async (req, res) => {
  try {
    const classrooms = await Classroom.find()
      .populate("students", "name");

    res.json({
      success: true,
      count: classrooms.length,
      data: classrooms
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
