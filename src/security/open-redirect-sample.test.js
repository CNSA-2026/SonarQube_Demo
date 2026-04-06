const { buildRedirectUrl } = require('./open-redirect-sample');

describe('open-redirect-sample', () => {
  test('returns user-supplied redirect URL (vulnerable)', () => {
    const url = 'https://evil.example.com';
    expect(buildRedirectUrl(url)).toBe(url);
  });
});
