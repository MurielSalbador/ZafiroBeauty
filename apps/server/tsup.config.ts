import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  clean: true,
  noExternal: [
    "@Depilacion/api",
    "@Depilacion/db",
    "@Depilacion/env",
    "@Depilacion/auth",
  ],
});
