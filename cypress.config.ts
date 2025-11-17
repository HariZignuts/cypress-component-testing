import { defineConfig } from "cypress";
import * as path from "path";
import vitePreprocessor from "cypress-vite";
const defaultBaseUrl = "http://127.0.0.1:5173";
export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || defaultBaseUrl,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // --- 2. ADD THIS BLOCK ---
      // This tells Cypress to use Vite to bundle your E2E test files
      // This will make it understand your path aliases
      on(
        "file:preprocessor",
        vitePreprocessor({
          configFile: path.resolve(__dirname, "vite.config.ts"),
          root: path.resolve(__dirname),
        })
      );

      // make sure env is available inside your tests via Cypress.env()
      config.env.BASE_URL = process.env.CYPRESS_BASE_URL || defaultBaseUrl;
      return config;
    },
  },
  component: {
    specPattern: "cypress/components/**/*.cy.{js,jsx,ts,tsx}",
    devServer: {
      framework: "react",
      bundler: "vite",

      viteConfig: {
        resolve: {
          alias: {
            "@/components": path.resolve(__dirname, "src/components"),
            "@/core": path.resolve(__dirname, "src/core"),
            "@/types": path.resolve(__dirname, "src/types"),
            "@/assets": path.resolve(__dirname, "src/assets"),
            "@pom": path.resolve(__dirname, "cypress/support/pom"),
            "@factories": path.resolve(__dirname, "cypress/support/factories"),
            "@fixtures": path.resolve(__dirname, "cypress/fixtures"),
          },
        },
      },
    },
  },
});
