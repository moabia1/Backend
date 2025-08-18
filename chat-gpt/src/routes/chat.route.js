const express = require("express");
const authUser = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authUser,(req, res) => {
  res.status(201).json({
    message: "Route Access Succesfull"
  })
})


module.exports = router;