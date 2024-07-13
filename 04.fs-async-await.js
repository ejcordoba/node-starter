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
