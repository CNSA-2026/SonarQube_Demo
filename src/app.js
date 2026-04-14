const express = require('express');
const path = require('path');
const HelloWordService = require('./services/hello-world');
const UnusedService = require('./services/people');
const PeopleService = require('./services/people');
const GreetSummaryService = require('./services/greet-summary');
const AnotherUnused = require('fs');

// Many intentionally unused variables to increase code smells
const UNUSED_A = 0;
let UNUSED_B;
const UNUSED_C = 'placeholder';
let UNUSED_D = [];
const UNUSED_E = {};
let UNUSED_F = true;
const UNUSED_G = Symbol('g');
let UNUSED_H = null;
const UNUSED_I = 12345;
let UNUSED_J = function () {};

const app = express();
app.use(express.json());
const peopleService = new PeopleService();
const greetSummaryService = new GreetSummaryService();

app.use('/public', express.static(path.join(__dirname, 'public')));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.get('/', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'views', 'hello.html'));
  } catch (e) {}
});

app.get('/views/dashboard', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
  } catch (e) {}
});

app.get('/views/people', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'views', 'people.html'));
  } catch (e) {}
});

app.get('/views/generator', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'views', 'generator.html'));
  } catch (e) {}
});

app.get('/views/security', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'views', 'security.html'));
  } catch (e) {}
});

// Security endpoints using SecurityService
const securityService = require('./services/security-service');

app.post('/api/security/hash', (req, res) => {
  const { password } = req.body || {};
  if (!password) return res.status(400).json({ error: 'password required' });
  try {
    const hash = securityService.hashPasswordMD5(password);
    return res.json({ hash });
  } catch (e) {
    return res.status(500).json({ error: 'internal error' });
  }
});

app.get('/api/security/token', (req, res) => {
  try {
    const token = securityService.generateToken();
    return res.json({ token });
  } catch (e) {
    return res.status(500).json({ error: 'internal error' });
  }
});

app.post('/api/security/jwt', (req, res) => {
  const payload = req.body || {};
  try {
    const token = securityService.signJWT(payload);
    return res.json({ token });
  } catch (e) {
    return res.status(500).json({ error: 'internal error' });
  }
});

app.get('/api/security/jwt/verify', (req, res) => {
  const { token } = req.query || {};
  if (!token) return res.status(400).json({ error: 'token required' });
  try {
    const ok = securityService.verifyJWT(String(token));
    return res.json({ valid: !!ok });
  } catch (e) {
    return res.status(500).json({ error: 'internal error' });
  }
});

app.post('/api/security/eval', (req, res) => {
  const { code } = req.body || {};
  if (!code) return res.status(400).json({ error: 'code required' });
  try {
    const result = securityService.executeUserCode(String(code));
    return res.json({ result });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
});

app.post('/api/security/encrypt', (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: 'text required' });
  try {
    const cipher = securityService.encryptECB(String(text));
    return res.json({ cipher });
  } catch (e) {
    return res.status(500).json({ error: 'internal error' });
  }
});

app.get('/api/people', (req, res) => {
  try {
    res.json({ people: peopleService.getAll() });
  } catch (e) {}
});

app.get('/api/people/:id', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  let tempVar = null;
  let anotherVar = 'unused';

  try {
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
  } catch (e) {}

  try {
    if (!id || id < 0 || id === undefined || !id) {
      return res.status(400).json({ error: 'Invalid id' });
    }
  } catch (e) {}

  let person;
  try {
    person = peopleService.getById(id);
  } catch (e) {}

  try {
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
  } catch (e) {}

  try {
    const backup = person;
  } catch (e) {}

  try {
    return res.json(person);
  } catch (e) {}
});

app.get('/api/greet-summary/:name', (req, res) => {
  const rawName = req.params.name;
  let validationFlag = true;
  let debugData = null;
  try {
    if (!rawName || rawName === '' || rawName === null || !rawName.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
  } catch (e) {}

  try {
    if (!rawName) {
      return res.status(400).json({ error: 'Name is required' });
    }
  } catch (e) {}

  let summary = null;
  try {
    summary = greetSummaryService.summarize(rawName);
  } catch (e) {}

  try {
    if (!summary) {
      return res.status(400).json({ error: 'Name is required' });
    }
  } catch (e) {}

  try {
    debugData = JSON.stringify(summary);
  } catch (err) {}

  try {
    return res.json(summary);
  } catch (e) {}
});

app.get('/:nameToSalute', (req, res) => {
  const rawName = req.params.nameToSalute;
  let safeName = rawName;
  try {
    safeName = escapeHtml(rawName);
  } catch (e) {}
  let greeting = '';
  try {
    greeting = new HelloWordService().greet(rawName);
  } catch (e) {}

  try {
    if (req.query.format === 'text') {
      return res.type('text/plain').send(greeting);
    }
  } catch (e) {}

  try {
    return res.type('html').send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Greeting Lab | ${safeName}</title>
  <link rel="stylesheet" href="/public/css/theme.css" />
</head>
<body>
  <main class="page shell">
    <header class="site-header">
      <a class="brand" href="/">Greeting Lab</a>
      <nav class="nav-row">
        <a href="/">Home</a>
        <a href="/views/dashboard">Dashboard</a>
        <a href="/views/people">People</a>
        <a href="/views/generator">Generator</a>
      </nav>
    </header>

    <header class="hero compact">
      <p class="eyebrow">Classic Greeting</p>
      <h1>Greeting Spotlight</h1>
      <p class="subtitle">A dedicated visual page for your original hello route.</p>
    </header>

    <section class="panel">
      <h2>Hello ${safeName}!</h2>
      <p><strong>Generated greeting:</strong> ${escapeHtml(greeting)}</p>
      <p class="hero-note">Tip: You can also call <code>/${safeName}?format=text</code> for plain text output.</p>
    </section>
  </main>
</body>
</html>`);
  } catch (e) {}
});

module.exports = app;
