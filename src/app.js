const express = require('express')
const path = require('path')
const HelloWordService = require( "./services/hello-world" );
const PeopleService = require("./services/people");
const GreetSummaryService = require("./services/greet-summary");

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

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const person = peopleService.getById(id);

  if (!person) {
    return res.status(404).json({ error: 'Person not found' });
  }

  return res.json(person);
});

app.get('/api/greet-summary/:name', (req, res) => {
  const summary = greetSummaryService.summarize(req.params.name);

  if (!summary) {
    return res.status(400).json({ error: 'Name is required' });
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