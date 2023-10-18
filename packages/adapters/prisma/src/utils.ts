import { Prisma, PrismaClient } from "@prisma/client";

export const getPrismaSchemas = async (client: PrismaClient) => {
  Prisma.dmmf.datamodel.models.forEach((model) => {
    // eslint-disable-next-line no-console
    console.log(model);
  });
  return Object.keys(client).filter(
    (key) => !key.startsWith("_") && !key.startsWith("$"),
  );
};
