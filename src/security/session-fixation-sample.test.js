const { authenticate } = require('./session-fixation-sample');

describe('session-fixation-sample', () => {
  test('authenticates by mutating existing session (vulnerable)', () => {
    const session = { id: 'sess-12345' };
    const out = authenticate(session, 'alice');
    expect(out.user).toBeDefined();
    expect(out.user.username).toBe('alice');
    // The session id should remain the same (no regeneration)
    expect(out.id).toBe('sess-12345');
  });
});
