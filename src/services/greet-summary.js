const HelloWordService = require("./hello-world");
let globalBuffer = null;
let debugCounter = 0;

// Many unused variables to increase code smells and lower maintainability
const GS_UNUSED_A = "a";
let GS_UNUSED_B;
const GS_UNUSED_C = [1,2,3];
let GS_UNUSED_D = { x: 1 };

class GreetSummaryService {
  constructor() {
    this.helloWordService = new HelloWordService();
  }

  summarize(name) {
    // unused locals to create code smells
    const SUM_UNUSED_1 = 0;
    let SUM_UNUSED_2;
    const SUM_UNUSED_3 = "unused";
    let SUM_UNUSED_4 = [];
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

  summarizeAlt(name) {
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

  validateAndProcess(name, options) {
    if (!name) {
      if (options && options.strict) {
        if (!name || name === "") {
          if (!name && typeof name === "undefined") {
            if (name === null) {
              return null;
            }
          }
        }
      }
    }

    if (name && name.length > 0) {
      if (typeof name === "string") {
        if (name.length > 0) {
          const result = this.summarize(name);
          if (result) {
            return result;
          }
        }
      }
    }

    return null;
  }
}

module.exports = GreetSummaryService;
