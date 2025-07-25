const express = require("express")
const userModel = require('../models/user.model')
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", async(req,res) => {
  const { username, password } = req.body;                                  
  const user = await userModel.create({
    username,password
  })

  const token = jwt.sign({
    id: user._id
  }, process.env.JWT_SECRET)

  res.cookie("token", token);
  
  res.status(201).json({
    message: "User Registerd Succesfully",
    user
  })
})

router.post("/login", async(req, res) => {
  const { username, password } = req.body;
  
  const isUserExist = await userModel.findOne({
    username:username
  })

  if (!isUserExist) {
    return res.status(401).json({
      message:"user account not found invalid [username]"
    })
  }

  if (password != isUserExist.password) {
    res.status(401).json({
      message:"Invalid Password"
    })
  }
  const token = jwt.sign({
    id:isUserExist.id
  }, process.env.JWT_SECRET)
  res.cookie("token",token)
  res.status(201).json({
    message:"get user Sucessfully"
  })
})

router.get("/user", async(req, res) => {
  const { token } = req.cookies;

  if(!token){
    res.status(401).json({
      message:"unauthorized"
    })
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({
      _id: decode.id
    }).select("-password")
    res.status(201).json({
      message: "User fetched successfully",
      user
    }) 
  } catch (error) {
    res.status(401).json({
      message:"Invalid User"
    })
  }

})
module.exports = router