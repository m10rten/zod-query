import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { IAdapter } from "..";

export class PrismaAdapter implements IAdapter {
  constructor(private client: PrismaClient) {}
  toZod<T>(_entity: T): z.AnyZodObject {
    throw new Error("Method not implemented.");
  }
}

export default PrismaAdapter;

export function adapter(client: PrismaClient) {
  return new PrismaAdapter(client);
}
