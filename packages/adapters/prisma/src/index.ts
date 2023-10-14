import { z } from "zod";
import { Prisma, PrismaClient } from "@prisma/client";
import { IAdapter } from "zod-query";

export class PrismaAdapter implements IAdapter {
  constructor(private _client: PrismaClient) {}
  // @ts-ignore
  toZod(_entity: Prisma.DMMF): z.AnyZodObject {
    // eslint-disable-next-line no-console
    console.log("toZod", _entity);

    throw new Error("Method not implemented.");
  }
}

export default PrismaAdapter;

export const adapter = (client: PrismaClient) => new PrismaAdapter(client);
