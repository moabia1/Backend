const express = require('express');
const connectToDb  = require('./db/db')

const app = express();
connectToDb();
app.use(express.json());

app.get('/notes', (req, res) => {
  res.send(req.body);
})
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  console.log(title,content)
})

app.listen('3000', () => {
  console.log("server running on port")
})