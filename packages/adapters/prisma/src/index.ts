import { z } from "zod";
import { Prisma, PrismaClient } from "@prisma/client";
import { IAdapter } from "zod-query";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export class PrismaAdapter
  implements IAdapter<ArrayElement<typeof Prisma.dmmf.datamodel.models>>
{
  constructor(private _client: PrismaClient) {}
  toZod<T extends ArrayElement<typeof Prisma.dmmf.datamodel.models>>(
    entity: T,
  ): z.AnyZodObject {
    // eslint-disable-next-line no-console
    console.log("toZod", entity);

    throw new Error("Method not implemented.");
  }
}

export default PrismaAdapter;

export const adapter = (client: PrismaClient) => new PrismaAdapter(client);
