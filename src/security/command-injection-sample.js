// Ejemplo intencionalmente vulnerable: concatenación de comandos del sistema
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

function buildShellCommand(userInput) {
  // Vulnerabilidad: concatenación de entrada del usuario en un comando
  return 'ls ' + userInput;
}

module.exports = { buildShellCommand };
