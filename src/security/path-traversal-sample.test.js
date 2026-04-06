const { buildFilePath } = require('./path-traversal-sample');

describe('path-traversal-sample', () => {
  test('joins user-supplied path without validation (vulnerable)', () => {
    const p = '../etc/passwd';
    const fp = buildFilePath(p);
    expect(fp).toContain('..');
    expect(fp).toContain('etc/passwd');
  });
});
