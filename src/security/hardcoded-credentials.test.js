const { API_TOKEN } = require('./hardcoded-credentials');

describe('hardcoded-credentials', () => {
  test('exports a hardcoded API token (vulnerable)', () => {
    expect(typeof API_TOKEN).toBe('string');
    expect(API_TOKEN).toContain('hardcoded-token');
  });
});
