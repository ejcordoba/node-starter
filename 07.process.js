// Objeto global process:
// Proporciona información y control sobre el proceso actual de ejecución
// Por ejemplo:

// Gestión de argumentos de entrada
console.log(process.argv);

// Controlar eventos del proceso
process.on("exit", () => {
  // Limpiar recursos
});

// Información del Current Working Directory
console.log(process.cwd());

// Plataforma
console.log(process.env.ENVVALUE); // ENVVALUE='YEAH' node 07.process.js

// Controlar la salida del proceso
process.exit("0"); // 0 bien, 1 mal
