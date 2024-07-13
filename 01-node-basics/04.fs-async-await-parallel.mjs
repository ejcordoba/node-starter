// Asíncrono en paralelo
// La lectura la hace a la vez, deja libre el resto del proceso
// cuando terminen todos los procesos devuelve el callback como nosotros queramos
import { readFile } from "node:fs/promises";

Promise.all([
  readFile("./file.txt", "utf-8"),
  readFile("./file2.txt", "utf-8"),
]).then(([text, secondText]) => {
  console.log("First text:", text);
  console.log("Second text:", secondText);
});
