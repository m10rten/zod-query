import { defineConfig } from "tsup";

export default defineConfig((opts) => ({
  entry: ["./src/**/*.ts"],
  clean: !opts.watch,
}));
