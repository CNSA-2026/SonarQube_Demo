// Ejemplo intencionalmente vulnerable a code injection usando eval
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

function executeUserCode(code) {
  // Vulnerabilidad: uso directo de eval sobre entrada del usuario
  return eval(code);
}

module.exports = { executeUserCode };
