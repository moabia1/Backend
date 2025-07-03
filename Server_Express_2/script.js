/*  Express:- 
             Express is a minimal and flexible Node.js web application framework available on npm (npm install express) that
             simplifies building servers and APIs efficiently.


    Server Creation:- 
                    Using Express, we can easily create a server by calling express() and defining routes to handle client 
                    requests and send responses, reducing the complexity of Node’s http module.


    Understanding Request and Response:
                                      Request (req): Data sent by the client to the server, containing information like URL, query, params, and body.

                                      Response (res): Data the server sends back to the client, which can be text, HTML, JSON, etc.

    Understanding API:
                      API (Application Programming Interface) allows communication between client and server by exposing 
                      endpoints for sending and receiving data.
                           
*/


const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send("Hello from express")
})

app.get('/about', (req, res) => {
  res.send("Hello from about page");
})

app.listen(3000, () => {
  console.log("server running on port")
})