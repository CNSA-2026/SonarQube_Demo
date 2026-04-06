# Ejemplos vulnerables para SonarQube

Estos archivos contienen ejemplos intencionalmente vulnerables con fines educativos y de testing para SonarQube.

NO USAR EN PRODUCCIÓN.

Contenido:

- `xss-client-sample.js`: inserción de contenido de usuario en `innerHTML` (XSS cliente).
- `server-eval-sample.js`: ejecución de `eval` sobre entrada del usuario (code injection).
- `sql-injection-sample.js`: construcción de consultas SQL por concatenación (SQLi).
- `hardcoded-credentials.js`: credencial/API token hardcoded (secreto en código).

Tests asociados (`*.test.js`) importan y ejercitan los módulos para que SonarQube los escanee durante CI.

Propósito: ejercicios y pruebas automáticas de detección de vulnerabilidades en SonarQube.
