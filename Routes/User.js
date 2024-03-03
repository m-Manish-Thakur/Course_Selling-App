const express = require("express");
const mongoose = require("mongoose");
const { User } = require("../DB/models");
const { Course } = require("../DB/models");
const router = express.Router();

const userMiddleware = require("../Middlewares/user");

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = await User.create({
    username: username,
    password: password,
  });

  return res.status(200).json("User Created Successfully");
});

router.get("/courses", userMiddleware, async (req, res) => {
  const courses = await Course.find({});

  return res.status(201).json({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const username = req.headers.username;
    console.log(courseId);

    await User.updateOne(
      { username: username },
      {
        $push: {
          purchasedCourse: courseId,
        },
      }
    );

    return res.json({ msg: "Course purchased successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
