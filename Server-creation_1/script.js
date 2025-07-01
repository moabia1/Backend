/* 1. Why use http module:-
                            Node.js has a built-in http module to create server, handle requests, and send responses.
                            Allows building backend servers without external libraries.
    Steps:-
          (i) Importing http module
          (ii) Creating a server
               req = Request object (client se aayi request ka data)
               res = Response object (client ko bhejne wala data)
          (iii) Server listening on a port
                3000 = port number where server listens for requests.
                Callback executes when the server starts successfully.
          (iv) Handling requests and sending responses   
                res.end() ends the response; always call it to finish the response cycle.      
*/

const http = require("http");

const server = http.createServer((req, res) => {
  res.end("hello Moawiya")
});

server.listen(3000, () => {});