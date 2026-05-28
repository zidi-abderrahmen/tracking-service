import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: 'http://localhost:4200',
    env: {
      apiUrl: 'http://localhost:8080'
    },
    specPattern: "src/app/cypress/e2e/**/*.cy.{js,ts}",
    setupNodeEvents(on, config) {},
  },
});