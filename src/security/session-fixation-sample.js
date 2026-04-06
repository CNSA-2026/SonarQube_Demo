// Ejemplo intencionalmente vulnerable: no se crea una nueva sesión durante la autenticación
// Esto simula un caso de session fixation (vulnerable) — NO USAR EN PRODUCCIÓN

function authenticate(session, user) {
  // Vulnerabilidad: no regenerar/crear nueva sesión al autenticar
  // Simplemente se asigna el usuario a la sesión existente
  session.user = { username: user };
  return session; // devuelve la misma sesión (id no cambia)
}

module.exports = { authenticate };
