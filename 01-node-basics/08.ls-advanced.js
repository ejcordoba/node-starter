const fs = require("node:fs/promises");
const path = require("node:path");
const pc = require("picocolors");

const folder = process.argv[2] ?? "."; // Sabemos la posición del folder previamente

async function ls(folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch {
    console.error(pc.red(`No se pudo leer el directorio: ${folder}`));
    process.exit(1); // Salimos correctamente del proceso
  }
  // Arriba hacemos asincronía secuencial, hasta no tener todos los archivos/subdir no seguimos
  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    try {
      stats = await fs.stat(filePath); // Status - información del archivo
    } catch {
      console.error(`No se pudo leer el directorio: ${filePath}`);
      process.exit(1); // Salimos correctamente del proceso
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? "d" : "f";
    const fileSize = stats.size;
    const fileModified = stats.mtime.toLocaleString();

    return `${fileType} ${pc.blue(file.padEnd(30))} ${pc
      .green(fileSize)
      .toString()
      .padStart(10)} ${pc.yellow(fileModified)}`;
  });

  const filesInfo = await Promise.all(filesPromises);

  filesInfo.forEach((fileInfo) => console.log(fileInfo));
}

ls(folder);
