const { parseXmlWithEntities } = require('./xxe-sample');

describe('xxe-sample', () => {
  test('throws when no parser provided (sample demonstrates use of external parser)', () => {
    expect(() => parseXmlWithEntities('<root/>')).toThrow();
  });
});
