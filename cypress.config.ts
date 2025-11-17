// cypress.config.ts

import { defineConfig } from "cypress";
import * as path from "path";
import vitePreprocessor from "cypress-vite";

const defaultBaseUrl = "http://127.0.0.1:5173";

// --- 1. Define your Vite config in ONE place ---
// We need to explicitly set the root to __dirname
// to override the `root: 'src'` from your main vite.config.ts
const sharedViteConfig = {
  root: __dirname,
  resolve: {
    alias: {
      "@/components/*": path.resolve(__dirname, "src/components/*"),
      "@/core/*": path.resolve(__dirname, "src/core/*"),
      "@/types/*": path.resolve(__dirname, "src/types/*"),
      "@/assets/*": path.resolve(__dirname, "src/assets/*"),
      "@pom/*": path.resolve(__dirname, "cypress/support/pom/*"),
      "@factories/*": path.resolve(__dirname, "cypress/support/factories/*"),
      "@fixtures/*": path.resolve(__dirname, "cypress/fixtures/*"),
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
          // 2. Use the shared config for E2E spec files
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

      // --- 3. THIS IS THE FIX ---
      // We pass the viteConfig as a FUNCTION.
      // This forces cypress-vite to use this config
      // and NOT load the default vite.config.ts.
      viteConfig: () => sharedViteConfig,
    },
    setupNodeEvents(on, config) {
      on(
        "file:preprocessor",
        vitePreprocessor({
          // 4. Use the shared config for Component spec files
          ...sharedViteConfig,
        })
      );
      return config;
    },
  },
});
