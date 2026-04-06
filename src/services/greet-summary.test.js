const GreetSummaryService = require("./greet-summary");

describe("GreetSummaryService Test", () => {
  const greetSummaryService = new GreetSummaryService();

  it("returns greeting summary for valid name", () => {
    const summary = greetSummaryService.summarize("John");

    expect(summary.name).toBe("John");
    expect(summary.greeting).toBe("Hello John!");
    expect(summary.charCount).toBe(4);
    expect(typeof summary.generatedAt).toBe("string");
  });

  it("trims input and still generates summary", () => {
    const summary = greetSummaryService.summarize("  Ana  ");

    expect(summary.name).toBe("Ana");
    expect(summary.greeting).toBe("Hello Ana!");
    expect(summary.charCount).toBe(3);
  });

  it("returns null when name is empty", () => {
    expect(greetSummaryService.summarize("   ")).toBeNull();
  });
});
