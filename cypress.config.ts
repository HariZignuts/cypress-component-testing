// cypress.config.ts

import { defineConfig } from "cypress";
import * as path from "path";
import vitePreprocessor from "cypress-vite";

const defaultBaseUrl = "http://127.0.0.1:5173";

// 1. Define the path to our new, safe config file
const cypressViteConfigPath = path.resolve(__dirname, "cypress.vite.config.ts");

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL ?? defaultBaseUrl,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      on(
        "file:preprocessor",
        vitePreprocessor({
          // 2. Point the E2E preprocessor to the new file
          configFile: cypressViteConfigPath,
        })
      );

      config.env.BASE_URL = process.env.CYPRESS_BASE_URL ?? defaultBaseUrl;
      return config;
    },
  },
  component: {
    specPattern: "cypress/components/**/*.cy.{js,jsx,ts,tsx}",
    devServer: {
      framework: "react",
      bundler: "vite",

      // 3. Point the component dev server to the new file
      viteConfig: {
        configFile: cypressViteConfigPath,
      },
    },
    setupNodeEvents(on, config) {
      on(
        "file:preprocessor",
        vitePreprocessor({
          // 4. Point the component preprocessor to the new file
          configFile: cypressViteConfigPath,
        })
      );
      return config;
    },
  },
});
