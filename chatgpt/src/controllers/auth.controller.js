const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function getRegisterController(req, res) {
  res.render("register")
}

async function postRegisterController(req,res) {
  const { username, password, email } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [
      { username: username },
      {email: email}
    ]
  })

  if (isUserExists) {
    return res.status(401).json({
      message: "User name or email Already exists"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username: username,
    email: email,
    password:hashedPassword
  })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.redirect("/");
}

async function getLoginController(req, res) {
  res.render("login")
}

async function postLoginController(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email:email
  })

  if (!user) {
    return res.json({
      message:"User not Exists"
    })
  }
console.log(user.password)
  const isPasswordValid = await bcrypt.compare(password,user.password,);
  console.log(isPasswordValid)

  if (!isPasswordValid) {
    return res.json({
      message: "Invalid password"
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token)
  
  res.redirect("/");
}


 module.exports = {
   getRegisterController,
   postRegisterController,
   getLoginController,
   postLoginController
}