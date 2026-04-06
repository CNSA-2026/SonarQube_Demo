const { buildShellCommand } = require('./command-injection-sample');

describe('command-injection-sample', () => {
  test('builds shell command by concatenation (vulnerable)', () => {
    const user = '; rm -rf /';
    const cmd = buildShellCommand(user);
    expect(cmd).toContain(user);
    expect(cmd.startsWith('ls ')).toBe(true);
  });
});
