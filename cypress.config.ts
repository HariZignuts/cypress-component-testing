import { defineConfig } from "cypress";
import * as path from "path";

export default defineConfig({
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
