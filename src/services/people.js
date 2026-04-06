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
    return this.people;
  }

  getById(id) {
    return this.people.find((person) => person.id === id) || null;
  }
}

module.exports = PeopleService;
