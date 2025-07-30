const jwt = require('jsonwebtoken')
const postModel = require('../models/post.model');

const createPostController = async (req, res) => {
  const file = req.file;
  
  const post = postModel.create({
    file
  })
}