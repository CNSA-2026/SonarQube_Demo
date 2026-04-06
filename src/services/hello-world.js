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
  }
  
  module.exports = HelloWordService;