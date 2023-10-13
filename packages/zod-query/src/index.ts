import { z } from "zod";
import DefaultAdapter from "@/adapters";
import PrismaAdapter from "@/adapters/prisma";

// eslint-disable-next-line no-console
console.info(`
  Thanks for installing 'zod-query'!
  This is the 0.0.4 version with no functionality.
`);

// The client we make easy to use
export type ZodQuery<T> = {
  get: () => T;
};

export interface IAdapter {
  // To convert a schema/model into zod schema, we have a toZod method, this must convert 1 entity into 1 zod schema.
  toZod: <T>(entity: T) => z.AnyZodObject;
}

export type Adapter = PrismaAdapter | DefaultAdapter;
type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type Options = {
  adapter: Prettify<Adapter>;
};

export const zq = <T>(options?: Options) => {
  // eslint-disable-next-line no-console
  console.log(options);
  const adapter = options?.adapter ?? new DefaultAdapter();
  const models = [
    // adapter.from();
    {
      name: "User",
      // more options here
    },
  ];
  const schemas = new Map<string, z.AnyZodObject>();
  for (const model of models) {
    const schema = adapter.toZod(model);
    schemas.set(model.name, schema);
  }

  return {
    ["schema"]: {
      get: () => ({}) as T,
    },
  };
};
