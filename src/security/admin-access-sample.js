// Ejemplo intencionalmente vulnerable: administración accesible sin restricción de IP
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

function isAdminAccessAllowed(ip) {
  // Vulnerabilidad: no restringe acceso por IP; siempre devuelve true
  return true;
}

module.exports = { isAdminAccessAllowed };
