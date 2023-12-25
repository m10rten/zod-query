import { PrismaClient } from "@prisma/client";
import { adapter } from "@zod-query/prisma-adapter";
import { zq, type Options } from "zod-query";

console.log("import PrismaClient");

console.log("import Options, zq");

console.log("import adapter");

console.log("start");

async function main() {
  setTimeout(() => {
    console.log("timeout");
  }, 10000);
  console.log("client");
  const client = new PrismaClient();
  await client.$connect();
  console.log(client);
  //
  console.log("b");
  const b = zq({ adapter: adapter(client) });
  console.log(b);
}

main();
