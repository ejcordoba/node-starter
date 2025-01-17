const http = require("node:http");

const dittoJSON = require("./pokemon-data/ditto.json");
const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case "GET":
      switch (url) {
        case "/pokemon-data/ditto":
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          return res.end(JSON.stringify(dittoJSON));
        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          return res.end("<h1>404 Not Found</h1>");
      }
    case "POST":
      switch (url) {
        case "/pokemon-data": {
          let body = "";
          // escuchar el evento data
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          // escuchar el evento de fin
          req.on("end", () => {
            const data = JSON.parse(body);
            // llamar a una base de datos para guardar la info
            res.writeHead(201, {
              "Content-Type": "application/json; charset=utf-8",
            });
            data.timestamp = Date.now();
            res.end(JSON.stringify(data));
          });
          break;
        }

        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          return res.end("404 Not Found");
      }
  }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log("Server listenting on port http://localhost:1234");
});
