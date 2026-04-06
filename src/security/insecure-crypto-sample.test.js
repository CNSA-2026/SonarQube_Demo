const { hashPasswordMD5 } = require('./insecure-crypto-sample');

describe('insecure-crypto-sample', () => {
  test('hashes with MD5 (weak)', () => {
    const h = hashPasswordMD5('password');
    expect(h).toHaveLength(32);
  });
});
