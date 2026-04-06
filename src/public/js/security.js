const hashForm = document.getElementById('hash-form');
const hashResult = document.getElementById('hash-result');
const genBtn = document.getElementById('gen-token');
const tokenResult = document.getElementById('token-result');
const jwtForm = document.getElementById('jwt-form');
const jwtResult = document.getElementById('jwt-result');
const evalForm = document.getElementById('eval-form');
const evalResult = document.getElementById('eval-result');
const encForm = document.getElementById('enc-form');
const encResult = document.getElementById('enc-result');

hashForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(hashForm);
  const password = String(form.get('password') || '');
  if (!password) return (hashResult.innerText = 'Provide password');
  try {
    const r = await fetch('/api/security/hash', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const j = await r.json();
    hashResult.innerText = j.hash || j.error;
  } catch (e) {
    hashResult.innerText = 'Error';
  }
});

genBtn.addEventListener('click', async () => {
  try {
    const r = await fetch('/api/security/token');
    const j = await r.json();
    tokenResult.innerText = j.token || j.error;
  } catch (e) {
    tokenResult.innerText = 'Error';
  }
});

jwtForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(jwtForm);
  const sub = String(form.get('sub') || 'user');
  try {
    const r = await fetch('/api/security/jwt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sub }),
    });
    const j = await r.json();
    jwtResult.innerText = j.token || j.error;
    if (j.token) {
      // verify
      const v = await fetch(
        '/api/security/jwt/verify?token=' + encodeURIComponent(j.token)
      );
      const vv = await v.json();
      jwtResult.innerText += '\nVerified: ' + String(vv.valid);
    }
  } catch (e) {
    jwtResult.innerText = 'Error';
  }
});

evalForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(evalForm);
  const code = String(form.get('code') || '');
  if (!code) return (evalResult.innerText = 'Provide code');
  try {
    const r = await fetch('/api/security/eval', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const j = await r.json();
    evalResult.innerText = j.result || j.error;
  } catch (e) {
    evalResult.innerText = 'Error';
  }
});

encForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(encForm);
  const text = String(form.get('text') || '');
  if (!text) return (encResult.innerText = 'Provide text');
  try {
    const r = await fetch('/api/security/encrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const j = await r.json();
    encResult.innerText = j.cipher || j.error;
  } catch (e) {
    encResult.innerText = 'Error';
  }
});
