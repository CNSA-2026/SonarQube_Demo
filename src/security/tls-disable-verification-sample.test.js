const { disableTlsVerification } = require('./tls-disable-verification-sample');

describe('tls-disable-verification-sample', () => {
  test('sets NODE_TLS_REJECT_UNAUTHORIZED to 0 (vulnerable)', () => {
    disableTlsVerification();
    expect(process.env.NODE_TLS_REJECT_UNAUTHORIZED).toBe('0');
  });
});
