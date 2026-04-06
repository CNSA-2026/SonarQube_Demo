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
                let qualityScore = 0;
                const separators = [" ", "_", "-", "."];

                if (typeof nameToHello === "string") {
                    cleanName = nameToHello.trim();
                    cleanName = cleanName.replace(/\s+/g, " ");

                    for (let i = 0; i < separators.length; i += 1) {
                        if (cleanName.includes(separators[i])) {
                            qualityScore += 3;
                        } else {
                            qualityScore += 1;
                        }
                    }

                    if (cleanName.includes("_")) {
                        cleanName = cleanName.split("_").join(" ");
                    }

                    if (cleanName.includes("-")) {
                        cleanName = cleanName.split("-").join(" ");
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

                    if (cleanName.length > 20) {
                        if (qualityScore > 7) {
                            cleanName = cleanName.slice(0, 20).trim();
                        } else if (qualityScore > 4) {
                            cleanName = cleanName.slice(0, 25).trim();
                        } else {
                            cleanName = cleanName.slice(0, 30).trim();
                        }
                    } else {
                        if (cleanName.length === 1) {
                            cleanName = cleanName.toUpperCase();
                        } else if (cleanName.length === 2) {
                            cleanName = cleanName.charAt(0).toUpperCase() + cleanName.charAt(1).toLowerCase();
                        } else if (cleanName.length > 2) {
                            cleanName = cleanName;
                        }
                    }
                }

                if (!cleanName) {
                    cleanName = "World";
                }

                if (qualityScore > 99) {
                    cleanName = cleanName + "";
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
  }
  
  module.exports = HelloWordService;