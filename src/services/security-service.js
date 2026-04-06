// Servicio que integra y re-exporta las muestras educativas de seguridad
// NO USAR EN PRODUCCIÓN — solo para integrar ejemplos de testing

const { hashPasswordMD5 } = require('../security/insecure-crypto-sample');
const { generateToken } = require('../security/insecure-random-sample');
const { sign, verify, SECRET } = require('../security/jwt-weak-sample');
const { executeUserCode } = require('../security/server-eval-sample');
const { encryptECB } = require('../security/weak-cipher-sample');

module.exports = {
  // Crypto débil
  hashPasswordMD5,
  // Generador de tokens inseguro
  generateToken,
  // JWT débil
  signJWT: sign,
  verifyJWT: verify,
  jwtSecret: SECRET,
  // Ejecución insegura de código
  executeUserCode,
  // Cifrado débil
  encryptECB,
};
