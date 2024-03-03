const { Admin } = require("../DB/models");

const adminMiddleware = async (req, res, next) => {
  try {
    const username = req.headers.username;
    const password = req.headers.password;

    const isExist = await Admin.findOne({
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
module.exports = adminMiddleware;
