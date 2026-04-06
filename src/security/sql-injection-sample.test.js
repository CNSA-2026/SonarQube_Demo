const { buildQuery } = require('./sql-injection-sample');

describe('sql-injection-sample', () => {
  test('builds query by string concatenation (vulnerable)', () => {
    const name = "O'Reilly";
    const q = buildQuery(name);
    expect(q).toContain("O'Reilly");
    expect(q.startsWith("SELECT * FROM users WHERE name = '")).toBe(true);
  });
});
