const express = require('express');
const connectToDb = require('./src/db/db');
const noteModel = require('./src/models/note.model')

const app = express();
app.use(express.json());

app.post('/notes', async (req, res) => {
  const { title, content } = req.body;
  await noteModel.create({
    title,content
  })
  res.json({
    message: "note created succesfully"
  })
})

app.get('/notes', async (req, res) => {
  const notes = await noteModel.find();
  res.json(notes)
})

app.delete('/notes', async (req, res) => {
  const noteId = req.params.id;

  noteModel.findOneAndDelete({
    _id : noteId
  })

  res.json({
    message: "note deleted"
  })
})

app.patch('/notes', async (req, res) => {
  const noteId = req.params.id;
  
})

connectToDb();
app.listen(3000, () => {
  console.log("Server running on port");
})