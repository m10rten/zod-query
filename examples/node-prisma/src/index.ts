console.log("import PrismaClient");

import { PrismaClient } from "@prisma/client";

console.log("import Options, zq");
import { type Options, zq } from "zod-query";

console.log("import adapter");
import { adapter } from "@zod-query/prisma-adapter";

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
