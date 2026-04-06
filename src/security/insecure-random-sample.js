// Ejemplo intencionalmente vulnerable: uso de Math.random para tokens
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

function generateToken() {
  // Vulnerabilidad: Math.random no es seguro para generar tokens/crypo
  return Math.random().toString(36).substr(2, 16);
}

module.exports = { generateToken };
