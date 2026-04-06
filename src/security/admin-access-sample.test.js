const { isAdminAccessAllowed } = require('./admin-access-sample');

describe('admin-access-sample', () => {
  test('allows admin access from any IP (vulnerable)', () => {
    const externalIp = '203.0.113.5';
    expect(isAdminAccessAllowed(externalIp)).toBe(true);
  });
});
