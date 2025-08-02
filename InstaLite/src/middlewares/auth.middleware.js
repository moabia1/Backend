const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const authMiddleware = async (req, res,next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Please login First",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETS);
    const user = await userModel.findOne({
      _id: decoded.id,
    });

    res.user = user;
    next()
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token, Please Login",
    });
  }
};

module.exports = authMiddleware