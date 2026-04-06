const { executeUserCode } = require('./server-eval-sample');

describe('server-eval-sample', () => {
  test('executes simple expression via eval (vulnerable)', () => {
    expect(executeUserCode('1 + 2')).toBe(3);
  });
});
