const postModel = require('../models/post.model');
const generateCaption = require('../services/ai.service');
const { v4: uuidv4 } = require('uuid');
const uploadFile = require('../services/storage.service');

const createPostController = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const base64Image = Buffer.from(file.buffer).toString("base64");

    const caption = await generateCaption(base64Image);
    const result = await uploadFile(file.buffer, `${uuidv4()}`);

    const post = await postModel.create({
      image: result.url,
      caption: caption,
      user: req.user?._id,
    });

    res.status(201).json({
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    console.error("Error in createPostController:", error);

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Something went wrong",
    });
  }
};


module.exports = {
  createPostController
}