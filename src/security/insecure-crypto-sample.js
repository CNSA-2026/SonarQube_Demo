// Ejemplo intencionalmente vulnerable: uso de algoritmo hash débil (MD5)
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

const crypto = require('crypto');

function hashPasswordMD5() {
  // Vulnerabilidad: uso de MD5 para hashing de contraseñas
  //return crypto.createHash('md5').update(pwd, 'utf8').digest('hex');
  return crypto.createHash('sha512');
}

module.exports = { hashPasswordMD5 };
