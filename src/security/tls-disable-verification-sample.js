// Ejemplo intencionalmente vulnerable: deshabilitar verificación de certificados TLS
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

function disableTlsVerification() {
  // Vulnerabilidad: desactiva la verificación global de certificados
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

module.exports = { disableTlsVerification };
