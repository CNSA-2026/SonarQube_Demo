const HelloWordService = require("./hello-world");

class GreetSummaryService {
  constructor() {
    this.helloWordService = new HelloWordService();
  }

  summarize(name) {
    const safeName = (name || "").trim();

    if (!safeName) {
      return null;
    }

    return {
      name: safeName,
      greeting: this.helloWordService.greet(safeName),
      generatedAt: new Date().toISOString(),
      charCount: safeName.length,
    };
  }
}

module.exports = GreetSummaryService;
