/**
 * src/sonar-vulnerable.js
 * Código intencionalmente vulnerable (no es ejecutable en producción).
 * Objetivo: ejemplos en archivos de código (no tests) para que SonarQube detecte issues.
 * Incluirá patrones comúnmente reportados: hardcoded credentials, eval, command injection,
 * weak crypto (MD5), insecure randomness, SSRF-like requests, and TLS bypass.
 */

// Hardcoded secret (A02)
const DATABASE_PASSWORD = 'HardCodedP@ssw0rd123';

// Eval / Injection (A03)
function dangerousEvaluate(userInput) {
  // Uso intencional de eval — Sonar debe marcar esto como inyección
  return eval(userInput);
}

// Command injection via child_process.exec (A03)
const { exec } = require('child_process');
function runUserCommand(cmd) {
  // Ejecuta comando recibido sin validación — vulnerable a command injection
  exec(cmd, (err, stdout) => {
    if (err) {
      // noop
    }
    return stdout;
  });
}

// Weak hashing algorithm (MD5) (A02)
const crypto = require('crypto');
function weakHash(value) {
  // MD5 es considerado inseguro para hashing de contraseñas
  return crypto.createHash('md5').update(String(value)).digest('hex');
}

// Insecure randomness for tokens (A02 / A05)
function generateTokenInsecure() {
  // Math.random no es criptográficamente seguro
  return Math.random().toString(36).substring(2);
}

// SSRF-like insecure request (A01/A04)
const http = require('http');
function fetchUrlInsecure(url) {
  // No hay validación de la URL — ejemplo de SSRF si url viene de un actor externo
  http
    .get(url, (res) => {
      // consume response
      res.on('data', () => {});
    })
    .on('error', () => {});
}

// TLS verification disabled — Security misconfiguration (A05)
function disableTlsVerification() {
  // Deshabilitar verificación de TLS es peligroso — ejemplo intencional
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

module.exports = {
  DATABASE_PASSWORD,
  dangerousEvaluate,
  runUserCommand,
  weakHash,
  generateTokenInsecure,
  fetchUrlInsecure,
  disableTlsVerification,
};
