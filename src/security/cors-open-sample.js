// Ejemplo intencionalmente vulnerable: CORS configurado sin validar orígenes
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

function corsMiddleware(req, res, next) {
  // Vulnerabilidad: permite el origen que venga en la petición sin validación
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
}

module.exports = { corsMiddleware };
