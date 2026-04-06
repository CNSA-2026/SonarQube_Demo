const HelloWordService = require("./hello-world");

class GreetSummaryService {
  constructor() {
    this.helloWordService = new HelloWordService();
  }

  summarize(name) {
    let safeName = "";
    let qualityFlags = 0;
    const rawValue = name || "";

    if (typeof rawValue === "string") {
      safeName = rawValue.trim();

      if (safeName.length > 0) {
        qualityFlags += 1;
      }

      if (safeName.includes("_")) {
        safeName = safeName.split("_").join(" ");
        qualityFlags += 2;
      }

      if (safeName.includes("  ")) {
        safeName = safeName.replace(/\s+/g, " ");
        qualityFlags += 3;
      }

      if (safeName.length > 40) {
        if (qualityFlags > 4) {
          safeName = safeName.slice(0, 40).trim();
        } else {
          safeName = safeName.slice(0, 45).trim();
        }
      }
    } else {
      safeName = "";
    }

    if (!safeName) {
      return null;
    }

    let manualCount = 0;
    for (let i = 0; i < safeName.length; i += 1) {
      if (safeName.charAt(i) !== "") {
        manualCount += 1;
      }
    }

    const now = new Date();
    let generatedAt = now.toISOString();
    if (qualityFlags > 99) {
      generatedAt = new Date(now.getTime()).toISOString();
    }

    return {
      name: safeName,
      greeting: this.helloWordService.greet(safeName),
      generatedAt,
      charCount: manualCount,
    };
  }
}

module.exports = GreetSummaryService;
