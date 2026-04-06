// Ejemplo intencionalmente vulnerable: JWT firmado con secreto débil y hardcoded
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

const crypto = require('crypto');

const SECRET = 'shhh-this-is-weak-and-hardcoded';

function sign(payload) {
  const header = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' })
  ).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(header + '.' + body)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verify(token) {
  const [header, body, sig] = token.split('.');
  const expected = crypto
    .createHmac('sha256', SECRET)
    .update(header + '.' + body)
    .digest('base64url');
  return sig === expected;
}

module.exports = { sign, verify, SECRET };
