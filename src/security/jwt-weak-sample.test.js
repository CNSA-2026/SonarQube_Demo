const { sign, verify } = require('./jwt-weak-sample');

describe('jwt-weak-sample', () => {
  test('signs and verifies with a hardcoded weak secret (vulnerable)', () => {
    const token = sign({ sub: 'user1' });
    expect(typeof token).toBe('string');
    expect(verify(token)).toBe(true);
  });
});
