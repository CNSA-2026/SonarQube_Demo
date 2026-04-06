const request = require("supertest");

const app = require("./app");

describe("GET /", () => {
    it("responds with home HTML and navigation", (done) => {
        request(app)
            .get("/")
            .expect(200)
            .expect("Content-Type", /html/)
            .expect((res) => {
                expect(res.text).toContain("Hello World, now with style");
                expect(res.text).toContain("/views/dashboard");
                expect(res.text).toContain("/views/people");
                expect(res.text).toContain("/views/generator");
            })
            .end(done);
    });
});

describe("GET /John", () => {
    //navigate to /John and check the the response is "Hello John!"
    it('responds with "Hello John!"', (done) => { 
        request(app).get('/John').expect('Hello John!', done);
    });
});

describe("GET /views/dashboard", () => {
    it("responds with dashboard HTML", (done) => {
        request(app)
            .get("/views/dashboard")
            .expect(200)
            .expect("Content-Type", /html/)
            .expect((res) => {
                expect(res.text).toContain("Creative Dashboard");
            })
            .end(done);
    });
});

describe("GET /views/people", () => {
    it("responds with people HTML", (done) => {
        request(app)
            .get("/views/people")
            .expect(200)
            .expect("Content-Type", /html/)
            .expect((res) => {
                expect(res.text).toContain("People View");
            })
            .end(done);
    });
});

describe("GET /views/generator", () => {
    it("responds with generator HTML", (done) => {
        request(app)
            .get("/views/generator")
            .expect(200)
            .expect("Content-Type", /html/)
            .expect((res) => {
                expect(res.text).toContain("Greeting Builder");
            })
            .end(done);
    });
});

describe("GET /api/people", () => {
    it("returns list of people", (done) => {
        request(app)
            .get("/api/people")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(Array.isArray(res.body.people)).toBe(true);
                expect(res.body.people.length).toBeGreaterThan(0);
            })
            .end(done);
    });
});

describe("GET /api/people/:id", () => {
    it("returns a specific person when id exists", (done) => {
        request(app)
            .get("/api/people/1")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body.id).toBe(1);
                expect(res.body.name).toBe("Ada Lovelace");
            })
            .end(done);
    });

    it("returns 404 when id does not exist", (done) => {
        request(app)
            .get("/api/people/999")
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe("Person not found");
            })
            .end(done);
    });
});

describe("GET /api/greet-summary/:name", () => {
    it("returns greeting summary for valid name", (done) => {
        request(app)
            .get("/api/greet-summary/John")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body.name).toBe("John");
                expect(res.body.greeting).toBe("Hello John!");
                expect(res.body).toHaveProperty("generatedAt");
                expect(res.body.charCount).toBe(4);
            })
            .end(done);
    });

    it("returns 400 when name is only spaces", (done) => {
        request(app)
            .get("/api/greet-summary/%20%20")
            .expect(400)
            .expect((res) => {
                expect(res.body.error).toBe("Name is required");
            })
            .end(done);
    });
});