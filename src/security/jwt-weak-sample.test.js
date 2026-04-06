const {
  signJWT: sign,
  verifyJWT: verify,
} = require('../services/security-service');

describe('jwt-weak-sample', () => {
  test('signs and verifies with a hardcoded weak secret (vulnerable)', () => {
    const token = sign({ sub: 'user1' });
    expect(typeof token).toBe('string');
    expect(verify(token)).toBe(true);
  });
});
