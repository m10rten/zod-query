import { PrismaClient } from "@prisma/client";
import { zq } from "zod-query";
import { adapter } from "zod-query/src/adapters/prisma";

export const prisma = new PrismaClient();

export const b = zq({ adapter: adapter(prisma) });
