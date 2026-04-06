const { renderUserContent } = require('./xss-client-sample');

describe('xss-client-sample', () => {
  test('inserts raw user input into innerHTML (vulnerable)', () => {
    const container = document.createElement('div');
    const malicious = '<img src=x onerror=alert("XSS") />';
    renderUserContent(container, malicious);
    expect(container.innerHTML).toContain('onerror=alert("XSS")');
  });
});
