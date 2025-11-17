// cypress.vite.config.ts
// A SPECIAL VITE CONFIG ONLY FOR CYPRESS

import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
  // 1. Set the root to the project root, NOT /src
  root: __dirname,

  // 2. Define all your aliases again here
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

  // 3. Explicitly allow Vite to serve files from the entire project
  server: {
    fs: {
      allow: [__dirname],
    },
  },
});
