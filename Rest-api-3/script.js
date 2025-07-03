/* npm => node package manager
   npx => node package executor (direct execute kr skta without install kiye)

  Understanding REST API:
                         REST (Representational State Transfer) API follows specific principles using HTTP methods like GET, POST, PUT, DELETE for performing CRUD operations on server resources.

*/
const express = require('express');

const app = express();

app.use(express.json());

const note = [];

app.post('/notes', (req, res) => {
  note.push(req.body)
  res.json({
    message: "Notes created successfully",
    note: note
  })
})

app.get('/notes', (req,res) => {
  res.json(note);
})

app.patch('/notes/:index', (req, res) => {
  const index = req.params.index;
  const { title } = req.body;


  note[index].title = title
  res.json({
    message: "Title updates succesfully"
  })

})

app.delete('/notes/:index', (req, res) => {
  const index = req.params.index;

  delete note[index];
  res.json({
    message: "note deleted succesfully"
  })
})
app.listen(3000, () => {
  console.log("server running n port");
})