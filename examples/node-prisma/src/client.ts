import { PrismaClient } from "@prisma/client";
import { zq } from "zod-query";
import { adapter } from "@zod-query/prisma-adapter";

export const client = new PrismaClient();

export const b = zq({ adapter: adapter(client) });
