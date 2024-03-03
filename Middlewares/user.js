const { User } = require("../DB/models");

const userMiddleware = async (req, res, next) => {
  try {
    const username = req.headers.username;
    const password = req.headers.password;

    const isExist = await User.findOne({
      username: username,
      password: password,
    });

    if (isExist) {
      next();
    } else {
      return res.status(403).json({
        msg: "User does'nt exists",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = userMiddleware;
