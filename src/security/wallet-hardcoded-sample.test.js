const { WALLET_MNEMONIC } = require('./wallet-hardcoded-sample');

describe('wallet-hardcoded-sample', () => {
  test('exports a hardcoded mnemonic (vulnerable)', () => {
    expect(typeof WALLET_MNEMONIC).toBe('string');
    expect(WALLET_MNEMONIC.split(' ').length).toBeGreaterThan(10);
  });
});
