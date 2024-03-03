const express = require("express");
const { Admin } = require("../DB/models");
const { Course } = require("../DB/models");
const router = express.Router();

const adminMiddleware = require("../Middlewares/admin");

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newAdmin = await Admin.create({
    username: username,
    password: password,
  });

  return res.status(200).json("Admin Created Successfully");
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const { courseName, des, price } = req.body;

  const newCourse = await Course.create({
    courseName,
    des,
    price,
  });

  res.status(201).json({
    msg: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({});
    return res.status(200).json({ courses });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
