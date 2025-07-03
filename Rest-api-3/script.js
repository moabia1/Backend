/* npm => node package manager
   npx => node package executor (direct execute kr skta without install kiye)

  Understanding REST API:
                         REST (Representational State Transfer) API follows specific principles using HTTP methods like GET, POST, PUT, DELETE for performing CRUD operations on server resources.

*/
const express = require('express');

const app = express();

app.use(express.json());

const note = [];

app.get('/about', (req, res) => {
  res.send("hellofromabout");
})

app.get('/home', (req,res) => {
  res.send("welcome from sheryians");
})

app.post('/note', (req, res) => {
  note.push(req.body)
  res.json({
    message: "Not created successfully",
    note: note
  })
})

app.listen(3000, () => {
  console.log("server running n port");
})