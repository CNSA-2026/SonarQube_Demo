const { encryptECB } = require('../services/security-service');

describe('weak-cipher-sample', () => {
  test('encrypts using AES-128-ECB (weak pattern)', () => {
    const c = encryptECB('hello world');
    expect(typeof c).toBe('string');
    expect(c.length).toBeGreaterThan(0);
  });
});
