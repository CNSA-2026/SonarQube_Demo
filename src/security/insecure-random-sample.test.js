const { generateToken } = require('../services/security-service');

describe('insecure-random-sample', () => {
  test('generates token using Math.random (insecure)', () => {
    const t = generateToken();
    expect(typeof t).toBe('string');
    expect(t.length).toBeGreaterThanOrEqual(8);
  });
});
