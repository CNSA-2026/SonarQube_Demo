// Ejemplo intencionalmente vulnerable: uso de modo ECB (no autenticado) y clave hardcoded
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

const crypto = require('crypto');

const KEY = Buffer.from('0123456789abcdef'); // 16 bytes (AES-128)

function encryptECB(plaintext) {
  // Vulnerabilidad: uso de AES-128-ECB (sin IV, no autenticación)
  const cipher = crypto.createCipheriv('aes-128-ecb', KEY, null);
  let out = cipher.update(plaintext, 'utf8', 'hex');
  out += cipher.final('hex');
  return out;
}

module.exports = { encryptECB };
