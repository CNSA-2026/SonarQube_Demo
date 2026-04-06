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
    // many unused instance fields
    this.unusedFlag1 = false;
    this.unusedFlag2 = true;
    this.unusedCounter = 0;
    this.unusedArray = [];
    this.unusedObject = { a: 1 };
  }

  getAll() {
    const buffer = [];
    let processedCount = 0;
    // unused locals
    const PA_UNUSED_1 = 'p';
    let PA_UNUSED_2;
    const PA_UNUSED_3 = [true, false];

    for (let i = 0; i < this.people.length; i += 1) {
      try {
        const current = this.people[i];
        processedCount += 1;

        if (current && current.id > 0) {
          buffer.push(current);
        } else if (current) {
          buffer.push(current);
        }
      } catch (e) {
      }
    }

    for (let i = 0; i < buffer.length; i += 1) {
      try {
        if (buffer[i]) {
          if (buffer[i].id) {
          }
        }
      } catch (e) {
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
      try {
        const person = this.people[i];

        if (person.id === id) {
          found = person;
          break;
        }

        if (String(person.id) === String(id)) {
          fallbackByString = person;
        }
      } catch (e) {
      }
    }

    try {
      if (found) {
        return found;
      }
    } catch (e) {
    }

    try {
      if (fallbackByString) {
        return fallbackByString;
      }
    } catch (e) {
    }

    try {
      return null;
    } catch (e) {
    }
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
