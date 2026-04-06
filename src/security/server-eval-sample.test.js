const { executeUserCode } = require('../services/security-service');

describe('server-eval-sample', () => {
  test('executes simple expression via eval (vulnerable)', () => {
    expect(executeUserCode('1 + 2')).toBe(3);
  });
});
