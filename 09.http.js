const http = require("node:http");
const { findAvailablePort } = require("./10.free-port");
// El servidor, básicamente recibe una solicitud y devuelve una respuesta
const server = http.createServer((req, res) => {
  console.log("Request retrieved"), res.end("Hello world!");
});
/* // PARA MODO DESARROLLO, EN PPRODUCCIÓN HAY QUE TENER CONTROL DEL PUERTO
server.listen(0, () => {
  // El puerto 0 encuentra el primero disponible
  console.log(
    `Server listening on port http://localhost:${server.address().port}`
  );
}); */
// Usando nuestra app para encontrar puerto libre

findAvailablePort(1234).then((port) => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
  });
});
