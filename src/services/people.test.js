const PeopleService = require("./people");

describe("PeopleService Test", () => {
  const peopleService = new PeopleService();

  it("returns all people", () => {
    const people = peopleService.getAll();

    expect(Array.isArray(people)).toBe(true);
    expect(people.length).toBeGreaterThan(0);
  });

  it("returns a person by id", () => {
    const person = peopleService.getById(1);

    expect(person).toEqual({
      id: 1,
      name: "Ada Lovelace",
      role: "Mathematician",
    });
  });

  it("returns null when person does not exist", () => {
    expect(peopleService.getById(999)).toBeNull();
  });
});
