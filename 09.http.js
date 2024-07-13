const http = require("node:http");
// El servidor, básicamente recibe una solicitud y devuelve una respuesta
const server = http.createServer((req, res) => {
  console.log("Request retrieved"), res.end("Hello world!");
});
// PARA MODO DESARROLLO, EN PPRODUCCIÓN HAY QUE TENER CONTROL DEL PUERTO
server.listen(0, () => {
  // El puerto 0 encuentra el primero disponible
  console.log(
    `Server listening on port http://localhost:${server.address().port}`
  );
});
