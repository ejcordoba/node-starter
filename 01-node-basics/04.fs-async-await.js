// Asíncrono secuencial
// Lectura asíncrona, empieza a leer el primer archivo,
// el proceso vuelve a estar libre y cuando encuentra el segundo lo lee, se devuelve en orden de ejecución de callback
// lo cual permite que mientras se resuelven los callback el proceso se libere
// pero aunque sea asíncrono el proceso no continúa hasta que se resuelva cada 'await'
const { readFile } = require("node:fs/promises");

async function init() {
  console.log("Reading first file ...");
  const text = await readFile("./file.txt", "utf-8");
  console.log("First text:", text);

  console.log("Do other stuff while file reading ...");

  console.log("Reading second file ...");
  const secondText = await readFile("./file2.txt", "utf-8");
  console.log("Second text:", secondText);
}

init();
