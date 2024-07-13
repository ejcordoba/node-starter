const http = require("node:http");
const fs = require("node:fs");

const desiredPort = process.env.SERVERPORT ?? 3000;

const processRequest = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (req.url === "/") {
    res.end("<h1>Bienvenido a mi página de inicio</h1>");
  } else if (req.url === "/test-img.png") {
    fs.readFile("./vegvisir.png", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("<h1> 500 Internal Server Error</h1>");
      } else {
        res.setHeader("Content-Type", "image/png");
        res.end(data);
      }
    });
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`);
});
