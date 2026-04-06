// Ejemplo intencionalmente vulnerable: subir archivos sin restricciones
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

const path = require('path');
const fs = require('fs');

function saveUploadedFile(uploadDir, file) {
  // Vulnerabilidad: guarda el archivo con el nombre original sin validación
  const dest = path.join(uploadDir, file.originalname);
  fs.writeFileSync(dest, file.buffer);
  return dest;
}

module.exports = { saveUploadedFile };
