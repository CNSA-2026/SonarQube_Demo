// Ejemplo intencionalmente vulnerable a XSS (cliente-side)
// NO USAR EN PRODUCCIÓN — solo con fines educativos y de testing SonarQube

function renderUserContent(container, userInput) {
  // Vulnerabilidad: insertar contenido del usuario directamente en innerHTML
  container.innerHTML = '<div class="user-content">' + userInput + '</div>';
}

module.exports = { renderUserContent };
