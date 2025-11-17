// cypress.config.ts

import { defineConfig } from "cypress";
import * as path from "path";
import vitePreprocessor from "cypress-vite";

const defaultBaseUrl = "http://127.0.0.1:5173";

// --- 1. Define your Vite aliases in ONE place ---
// We will use this object for all Cypress-related Vite configs
const sharedViteConfig = {
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
};

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL ?? defaultBaseUrl,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      on(
        "file:preprocessor",
        vitePreprocessor({
          // --- 2. Use the shared config INLINE for E2E specs ---
          // We pass the config object directly, NOT the file path.
          ...sharedViteConfig,
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
      // --- 3. Use the shared config for the dev server ---
      viteConfig: sharedViteConfig,
    },
    setupNodeEvents(on, config) {
      on(
        "file:preprocessor",
        vitePreprocessor({
          // --- 4. Use the same shared config INLINE for component specs ---
          ...sharedViteConfig,
        })
      );
      return config;
    },
  },
});
