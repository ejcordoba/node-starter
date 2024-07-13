const path = require("node:path");
// Que separador usa el sistema operativo:
console.log(path.sep);

// Unir rutas con path.join
const filePath = path.join("content", "subfolder", "test.txt");
console.log(filePath, "<- se ha generado usando el separador del SO");

// Nombre de un fichero
const base = path.basename("/tmp/secret/password.txt");
console.log(base);

// Nombre de un fichero sin la extensión
const filename = path.basename("/tmp/secret/password.txt", ".txt");
console.log(filename);

// Extensión de un archivo
const extension = path.extname("image.jpg");
console.log(extension);
