const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authUser(req,res,next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/auth/login")
  } 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = userModel.findById(decoded.id);

    req.user = user
    next();
  } catch (error) {
    res.redirect("/auth/login");
  }
}

module.exports = authUser