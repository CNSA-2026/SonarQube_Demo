/**
 * src/sonar-vulnerable.test.js
 * Tests educativos intencionalmente vulnerables para SonarQube (OWASP examples)
 * No ejecutar payloads peligrosos; los ejemplos muestran patrones inseguros.
 */

const crypto = require('crypto');

describe('SonarQube Vulnerable Examples (educational)', () => {
  // --- Hardcoded secret (A02) ---
  const API_KEY = 'SUPER_SECRET_API_KEY_12345';
  it('uses a hardcoded secret (A02)', () => {
    expect(typeof API_KEY).toBe('string');
  });

  // --- Eval / Injection (A03) ---
  function evaluateExpression(expr) {
    // Uso intencional de eval para demostrar riesgo de inyección
    return eval(expr);
  }
  it('uses eval (injection) but with safe literal in test (A03)', () => {
    expect(evaluateExpression('1 + 2')).toBe(3);
  });

  // --- Unsanitized output / XSS (A07) ---
  function renderGreeting(name) {
    // Concatenación insegura — riesgo XSS si `name` no es de confianza
    return '<p>Hello, ' + name + '</p>';
  }
  it('renders unsanitized HTML (XSS) but with safe input (A07)', () => {
    expect(renderGreeting('Alice')).toContain('Alice');
  });

  // --- Broken Access Control / IDOR (A01) ---
  const fakeDB = {
    user1: { id: 'user1', secret: 'user1-secret' },
    user2: { id: 'user2', secret: 'user2-secret' },
  };
  function getUserProfile(requestingUserId, targetUserId) {
    // Falta de verificación de autorización: devuelve datos del target sin comprobar permisos
    return fakeDB[targetUserId];
  }
  it('demonstrates IDOR-like access (A01) but called with same ids to keep test safe', () => {
    const profile = getUserProfile('user1', 'user1');
    expect(profile).toHaveProperty('secret');
  });

  // --- Weak crypto example: MD5 (A02) ---
  function hashPasswordWeak(password) {
    return crypto.createHash('md5').update(password).digest('hex'); // algoritmo débil intencional
  }
  it('uses weak hashing algorithm MD5 (A02)', () => {
    const h = hashPasswordWeak('password');
    expect(h.length).toBe(32);
  });

  // --- Security misconfiguration: debug mode enabled (A05) ---
  const DEBUG_MODE = true; // exposición intencional de flag de debug
  it('exposes debug flag (A05)', () => {
    expect(DEBUG_MODE).toBe(true);
  });
});
