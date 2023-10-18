#!/bin/sh/env node
import { Command } from "commander";
import { version } from "../package.json";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const program = new Command()
    .name("Zod Query")
    .description("Add adapters to Zod Query, generate SQL and more.")
    .version(`Version: ${version}`, "-v, --version", "output the current version");

  program.parse();
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
