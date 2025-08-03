const jwt = require('jsonwebtoken')
const postModel = require('../models/post.model');
const generateCaption = require('../services/ai.service');

const createPostController = async (req, res) => {
  const file = req.file;

  console.log(file)

  const base64Image = new Buffer.from(file.buffer).toString('base64');
  const caption = await generateCaption(base64Image);

  res.json({
    caption
  })
  
}

module.exports = {
  createPostController
}