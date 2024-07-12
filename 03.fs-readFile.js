const fs = require("node:fs");

console.log("Reading first file ...");
// Lectura síncrona:
// const text = fs.readFileSync("./file.txt", "utf-8");
// Lectura asíncrona:
fs.readFile("./file.txt", "utf-8", (err, text) => {
  console.log(text);
});

console.log("Do other stuff while file reading ...");

console.log("Reading second file ...");
fs.readFile("./file2.txt", "utf-8", (err, text) => {
  console.log(text);
});
