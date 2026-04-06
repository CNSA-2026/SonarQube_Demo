// Ejemplo intencionalmente vulnerable: path traversal
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

const path = require('path');

function buildFilePath(userPath) {
  // Vulnerabilidad: usar la ruta proporcionada por el usuario sin normalizar/validar
  return path.join('/var/data', userPath);
}

module.exports = { buildFilePath };
