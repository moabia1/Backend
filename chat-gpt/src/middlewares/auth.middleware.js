const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authUser(req, res, next) {
  const token = req.cookies;
  if (!token) {
    return res.status(401).json({
      message:"Please login first"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById({ _id: decoded.id })
    console.log(user)
    req.user = user
    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = authUser