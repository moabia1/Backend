const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

async function registerController(req, res) {
  const { email, fullName: { firstName, lastName }, password } = req.body;
  const isUserExist = await userModel.findOne({
    email
  });

  if (isUserExist) {
    return res.status(401).json({message:"User Already Exists"})
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email: email,
    fullName: {
      firstName,
      lastName
    },
    password:hashedPassword
  })

  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(201).json({
    message: "User register Succesfull",
    user
  })
}

async function loginController(req,res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email:email
  })
  if (!user) {
    return res.status(401).json({
      message:"User not Exists"
    })
  }

  const isPassworValid = bcrypt.compare(password, user.password);
  if (!isPassworValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(201).json({
    message: "User Login Succesfully",
    user
  })
}
module.exports = {
  registerController,
  loginController
}