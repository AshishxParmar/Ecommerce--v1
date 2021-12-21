const jwt = require("jsonwebtoken");
const User = require("../DB/models/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    // console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).json({ success: false, error: "Please authenticate!" });
  }
};

module.exports = authenticate;
