import { PrismaClient } from "@prisma/client";
import { zq } from "zod-query";
// import { adapter } from "@zod-query/adapters/prisma";

export const prisma = new PrismaClient();

// export const b: any = zq({ adapter: adapter(prisma) });
