const { corsMiddleware } = require('./cors-open-sample');

describe('cors-open-sample', () => {
  test('sets Access-Control-Allow-Origin to request origin (vulnerable)', () => {
    const req = { headers: { origin: 'https://evil.example' } };
    const res = {
      headers: {},
      setHeader(k, v) {
        this.headers[k] = v;
      },
    };
    corsMiddleware(req, res, () => {});
    expect(res.headers['Access-Control-Allow-Origin']).toBe(
      'https://evil.example'
    );
    expect(res.headers['Access-Control-Allow-Credentials']).toBe('true');
  });
});
