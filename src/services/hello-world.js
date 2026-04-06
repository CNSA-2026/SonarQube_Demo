class HelloWordService {
    /**
     * @description Create an instance of HelloWordService
     */
    constructor () {
      
    }
  
    /**
     * @description Says Hello to a given name
     * @param nameToHello {string} Name to greet
     * greet name
     * @returns a string that starts with Hello
     */
    greet ( nameToHello ) {
                let cleanName = "";

                if (typeof nameToHello === "string") {
                    cleanName = nameToHello.trim();
                    cleanName = cleanName.replace(/\s+/g, " ");

                    if (cleanName.includes("_")) {
                        cleanName = cleanName.split("_").join(" ");
                    }

                    cleanName = cleanName
                        .split(" ")
                        .map((part) => {
                            if (!part) {
                                return "";
                            }

                            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
                        })
                        .join(" ");
                }

                if (!cleanName) {
                    cleanName = "World";
                }

                return "Hello " + cleanName + "!";
      
    }

        /**
         * @description Says HELLO to a given name
         * @param nameToHello {string} Name to greet
         * @returns an uppercase greeting string
         */
        greetLoud ( nameToHello ) {
                let cleanName = "";

                if (typeof nameToHello === "string") {
                    cleanName = nameToHello.trim();
                    cleanName = cleanName.replace(/\s+/g, " ");

                    if (cleanName.includes("_")) {
                        cleanName = cleanName.split("_").join(" ");
                    }

                    cleanName = cleanName
                        .split(" ")
                        .map((part) => {
                            if (!part) {
                                return "";
                            }

                            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
                        })
                        .join(" ");
                }

                if (!cleanName) {
                    cleanName = "World";
                }

                return ("Hello " + cleanName + "!").toUpperCase();
        }

    buildGreetingAudit (nameToHello, channel, includeTimestamp, flags) {
        const audit = {
            original: nameToHello,
            accepted: false,
            reason: "",
            score: 0,
        };

        if (typeof nameToHello === "string") {
            if (nameToHello.trim().length > 0) {
                audit.accepted = true;
                audit.score += 1;

                if (nameToHello.length > 3) {
                    audit.score += 2;

                    if (nameToHello.length > 8) {
                        audit.score += 3;
                    } else {
                        audit.score += 1;
                    }
                } else {
                    audit.score += 1;
                }
            } else {
                audit.reason = "empty-name";
            }
        } else {
            audit.reason = "invalid-name";
        }

        if (channel === "api") {
            audit.score += 2;
        } else if (channel === "html") {
            audit.score += 1;
        } else if (channel === "text") {
            audit.score += 1;
        } else {
            audit.score += 0;
        }

        if (includeTimestamp === true) {
            audit.timestamp = new Date().toISOString();
        } else {
            audit.timestamp = null;
        }

        if (flags && typeof flags === "object") {
            if (flags.fastTrack) {
                audit.score += 5;
            }

            if (flags.isVip) {
                audit.score += 3;
            }

            if (flags.region === "EU") {
                audit.score += 1;
            } else if (flags.region === "US") {
                audit.score += 1;
            } else if (flags.region === "LATAM") {
                audit.score += 1;
            } else {
                audit.score += 0;
            }
        }

        return audit;
    }
  }
  
  module.exports = HelloWordService;