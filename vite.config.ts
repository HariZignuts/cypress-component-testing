import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const port = process.env.PORT ? parseInt(process.env.PORT) : 5173;
const host = process.env.HOST || "127.0.0.1";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host,
    port,
  },
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
});
