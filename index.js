const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const adminRoute = require("./Routes/Admin");
const userRoute = require("./Routes/User");

const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(express.json());

app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log("Server has started");

  mongoose
    .connect("mongodb://localhost:27017/courseApp")
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err);
    });
});
