const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  const { username, password } = req.body;
  const userExist = await userModel.findOne({
    username:username
  })
  if (userExist) {
    res.status(409).json({
      message:"User Already Exists"
    })
  }

    const userData = userModel.create({
      username,
      password: await bcrypt.hash(password, 10)
    }); 

  const token = jwt.sign(
    {
      id: userData._id,
    },
    process.env.JWT_SECRETS
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Registered Succesfully",
    userData,
  });
}

const loginController = async (req, res) => {
  const { username, password } = req.body;
  const isUserExists = await userModel.findOne({
    username:username
  })
  if (!isUserExists) {
    res.status(401).json({
      message:"User not Exist"
    })
  }

  const isValidPassword = await bcrypt.compare(password, isUserExists.password);
  if (!isValidPassword) {
    res.status(409).json({
      message:"Invalid Password"
    })
  }

  const token = jwt.sign({
    id: isUserExists._id
  }, process.env.JWT_SECRETS)
  
  res.cookie("token", token)
  
  res.status(201).json({
    message: "User login Succesfully"
  });
}

module.exports = {
  registerController,
  loginController
}