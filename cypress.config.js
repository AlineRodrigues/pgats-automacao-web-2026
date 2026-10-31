const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: 1,
  // retries: {
  // openMode: 0, //interativo / headed / ui
  // runMode: 2 // headless
  // },

  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: `https://automationexercise.com/`,
    //watchForFileChanges: false,
    //viewportWidth": 100,
    //viewportHeight: 100,
    env: {
      baseUrlSecondary: `https://excalidraw.com/`,
      apiURL: `https://automationexercise.com/api`,
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
