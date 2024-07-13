const express = require("express");
const dittoJSON = require("./pokemon-data/ditto.json");

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable("x-powered-by");

app.use(express.json());
/* // Middleware
app.use((req, res, next) => {
  if (req.method !== "POST") return next();
  if (req.headers["content-type"] !== "application/json") return next();

  // Solo llegan request que son POST y que tienen el header Content-Type: application/json
  let body = "";
  // escuchar el evento data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  // escuchar el evento de fin
  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    // Mutar la request y meter la información en el req.body
    req.body = data;
    next();
  });
}); */

app.get("/", (req, res) => {
  res.send("<h1>Mi página</h1>");
});

app.get("/pokemon-data/ditto", (req, res) => {
  res.json(dittoJSON);
});

app.post("/pokemon-data", (req, res) => {
  // req.body debería ser guardado en bbdd
  res.status(201).json(req.body);
});

// La última a la que va a llegar, no la definimos para el 404
app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(PORT, () => {
  console.log(`Server listenting on port http://localhost:${PORT}`);
});
