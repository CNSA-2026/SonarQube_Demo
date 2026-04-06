// Ejemplo intencionalmente vulnerable: open redirect
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

function buildRedirectUrl(userUrl) {
  // Vulnerabilidad: redirigir directamente a una URL proporcionada por el usuario
  return userUrl;
}

module.exports = { buildRedirectUrl };
