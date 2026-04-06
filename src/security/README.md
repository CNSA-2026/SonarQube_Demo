# Ejemplos vulnerables para SonarQube

Estos archivos contienen ejemplos intencionalmente vulnerables con fines educativos y de testing para SonarQube.

NO USAR EN PRODUCCIÓN.

Contenido:

- `xss-client-sample.js`: inserción de contenido de usuario en `innerHTML` (XSS cliente).
- `server-eval-sample.js`: ejecución de `eval` sobre entrada del usuario (code injection).
- `sql-injection-sample.js`: construcción de consultas SQL por concatenación (SQLi).
- `hardcoded-credentials.js`: credencial/API token hardcoded (secreto en código).

Adicionalmente este directorio contiene ejemplos que representan debilidades clásicas que SonarQube suele marcar como issues o security hotspots:

- `command-injection-sample.js`: concatenación de comandos del sistema con entrada del usuario (Command Injection).
- `path-traversal-sample.js`: uso de rutas proporcionadas por el usuario sin validación (Path Traversal).
- `insecure-random-sample.js`: uso de `Math.random` para generar tokens (RNG inseguro).
- `insecure-crypto-sample.js`: uso de MD5 para hashing (algoritmo débil).
- `open-redirect-sample.js`: redirección hacia URL controlada por el usuario (Open Redirect).

Tests asociados (`*.test.js`) importan y ejercitan los módulos para que SonarQube los escanee durante CI.

Propósito: ejercicios y pruebas automáticas de detección de vulnerabilidades en SonarQube.
