// Ejemplo intencionalmente vulnerable: XML parser que podría permitir XXE
// NO USAR EN PRODUCCIÓN — educativo/testing SonarQube

function parseXmlWithEntities(xmlString, parser) {
  // Vulnerabilidad: usar un parser sin deshabilitar la expansión de entidades
  // Para fines educativos, permitimos inyectar el parser (e.g., xmldom, libxmljs)
  if (!parser || typeof parser.parseFromString !== 'function') {
    throw new Error('Parser with parseFromString required for this sample');
  }
  return parser.parseFromString(xmlString, 'text/xml');
}

module.exports = { parseXmlWithEntities };
