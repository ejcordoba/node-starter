const fs = require("node:fs");

const stats = fs.statSync("./file.txt");
console.log(
  stats.isFile(), // If it is a file
  stats.isDirectory(), // If it is a directory
  stats.isSymbolicLink(), // If it is a symbolic link
  stats.size // Size in bytes
);
