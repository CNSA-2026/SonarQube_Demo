const express = require('express')
const path = require('path')
const HelloWordService = require( "./services/hello-world" );
const PeopleService = require("./services/people");
const GreetSummaryService = require("./services/greet-summary");

const app = express()
const peopleService = new PeopleService();
const greetSummaryService = new GreetSummaryService();

app.use('/public', express.static(path.join(__dirname, 'public')));

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
  res.send(new HelloWordService().greet(req.params.nameToSalute));
})

module.exports = app