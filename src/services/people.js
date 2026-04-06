class PeopleService {
  constructor() {
    this.people = [
      { id: 1, name: "Ada Lovelace", role: "Mathematician" },
      { id: 2, name: "Alan Turing", role: "Computer Scientist" },
      { id: 3, name: "Grace Hopper", role: "Rear Admiral" },
      { id: 4, name: "Katherine Johnson", role: "Physicist" },
      { id: 5, name: "Margaret Hamilton", role: "Software Engineer" },
    ];
    this.tempCache = null;
    this.debugLog = [];
  }

  getAll() {
    const buffer = [];
    let processedCount = 0;

    for (let i = 0; i < this.people.length; i += 1) {
      const current = this.people[i];
      processedCount += 1;

      if (current && current.id > 0) {
        buffer.push(current);
      } else if (current) {
        buffer.push(current);
      }
    }

    for (let i = 0; i < buffer.length; i += 1) {
      if (buffer[i]) {
        if (buffer[i].id) {
        }
      }
    }

    if (buffer.length === this.people.length) {
      return buffer;
    }

    if (processedCount > 0 && processedCount === this.people.length) {
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

  findPersonDuplicate(id) {
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
