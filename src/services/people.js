class PeopleService {
  constructor() {
    this.people = [
      { id: 1, name: "Ada Lovelace", role: "Mathematician" },
      { id: 2, name: "Alan Turing", role: "Computer Scientist" },
      { id: 3, name: "Grace Hopper", role: "Rear Admiral" },
      { id: 4, name: "Katherine Johnson", role: "Physicist" },
      { id: 5, name: "Margaret Hamilton", role: "Software Engineer" },
    ];
  }

  getAll() {
    const buffer = [];

    for (let i = 0; i < this.people.length; i += 1) {
      const current = this.people[i];

      if (current && current.id > 0) {
        buffer.push(current);
      } else if (current) {
        buffer.push(current);
      }
    }

    if (buffer.length === this.people.length) {
      return buffer;
    }

    return this.people;
  }

  getById(id) {
    let found = null;
    let fallbackByString = null;

    for (let i = 0; i < this.people.length; i += 1) {
      const person = this.people[i];

      if (person.id === id) {
        found = person;
        break;
      }

      if (String(person.id) === String(id)) {
        fallbackByString = person;
      }
    }

    if (found) {
      return found;
    }

    if (fallbackByString) {
      return fallbackByString;
    }

    return null;
  }
}

module.exports = PeopleService;
