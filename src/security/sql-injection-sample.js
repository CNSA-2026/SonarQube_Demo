// Ejemplo intencionalmente vulnerable a SQL injection (simulado)
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

function buildQuery(name) {
  // Vulnerabilidad: concatenación de cadenas para construir consultas SQL
  return "SELECT * FROM users WHERE name = '" + name + "';";
}

module.exports = { buildQuery };
