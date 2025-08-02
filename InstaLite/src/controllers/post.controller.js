const jwt = require('jsonwebtoken')
const postModel = require('../models/post.model');

const createPostController = async (req, res) => {
  const file = req.file;
  
  console.log(file)
  
}

module.exports = {
  createPostController
}