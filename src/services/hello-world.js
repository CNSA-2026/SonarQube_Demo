class HelloWordService {
    constructor() {
      this.tempVar = null;
      this.unusedArray = [];
      this.debugFlag = false;
    }
  
    greet(nameToHello) {
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

    greetAlternate(nameToHello) {
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

    greetBackup(nameToHello) {
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

    greetLoud(nameToHello) {
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