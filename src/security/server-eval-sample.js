// Ejemplo intencionalmente vulnerable a code injection usando eval
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

function executeUserCode(code) {
  // Vulnerabilidad: uso directo de eval sobre entrada del usuario
  return eval(code);
}

module.exports = { executeUserCode };

String query = "SELECT * FROM users WHERE id = " + userInput;
Statement stmt = connection.createStatement();
ResultSet rs = stmt.executeQuery(query); // Vulnerabilidad detectada   