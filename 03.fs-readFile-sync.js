// Lectura Síncrona
// El proceso está ocupado, hasta que no se termina la primera lectura no empieza la segunda
const fs = require("node:fs");

console.log("Reading first file ...");
const text = fs.readFileSync("./file.txt", "utf-8");
console.log("First text: ", text);

console.log("Do other stuff while file reading ...");

console.log("Reading second file ...");
const secondText = fs.readFileSync("./file2.txt", "utf-8");
console.log("Second text: ", secondText);
