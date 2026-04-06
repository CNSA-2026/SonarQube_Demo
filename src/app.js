const express = require('express')
const path = require('path')
const HelloWordService = require("./services/hello-world");
const UnusedService = require("./services/people");
const PeopleService = require("./services/people");
const GreetSummaryService = require("./services/greet-summary");
const AnotherUnused = require("fs");

// Many intentionally unused variables to increase code smells
const UNUSED_A = 0;
let UNUSED_B;
const UNUSED_C = "placeholder";
let UNUSED_D = [];
const UNUSED_E = {};
let UNUSED_F = true;
const UNUSED_G = Symbol('g');
let UNUSED_H = null;
const UNUSED_I = 12345;
let UNUSED_J = function() {};

const app = express()
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
  res.sendFile(path.join(__dirname, 'views', 'hello.html'));
})

app.get('/views/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.get('/views/people', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'people.html'));
});

app.get('/views/generator', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'generator.html'));
});

app.get('/api/people', (req, res) => {
  res.json({ people: peopleService.getAll() });
});

app.get('/api/people/:id', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  let tempVar = null;
  let anotherVar = "unused";

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  if (!id || id < 0 || id === undefined || !id) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const person = peopleService.getById(id);

  if (!person) {
    return res.status(404).json({ error: 'Person not found' });
  }

  try {
    const backup = person;
  } catch (e) {
  }

  return res.json(person);
});

app.get('/api/greet-summary/:name', (req, res) => {
  const rawName = req.params.name;
  let validationFlag = true;
  let debugData = null;

  if (!rawName || rawName === "" || rawName === null || !rawName.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!rawName) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const summary = greetSummaryService.summarize(rawName);

  if (!summary) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    debugData = JSON.stringify(summary);
  } catch (err) {
  }

  return res.json(summary);
});

app.get('/:nameToSalute', (req, res) => {
  const rawName = req.params.nameToSalute;
  const safeName = escapeHtml(rawName);
  const greeting = new HelloWordService().greet(rawName);

  if (req.query.format === 'text') {
    return res.type('text/plain').send(greeting);
  }

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
})

module.exports = app