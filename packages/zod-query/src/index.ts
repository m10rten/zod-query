import { z } from "zod";
import DefaultAdapter from "@/adapters";

import { version } from "../package.json";

// eslint-disable-next-line no-console
console.info(`
  Thanks for installing 'zod-query'!
  This is the ${version} version with no functionality.
`);

// The client we make easy to use
export type ZodQuery<T> = {
  get: () => T;
};

export interface IAdapter<T> {
  // To convert a schema/model into zod schema, we have a toZod method, this must convert 1 entity into 1 zod schema.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
  toZod: (entity: T) => z.AnyZodObject;
}

type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type Options<T> = {
  adapter: Prettify<IAdapter<T>>;
};

export const zq = <T>(options?: Options<T>) => {
  // eslint-disable-next-line no-console
  console.log(options);
  // const adapter = options?.adapter ?? new DefaultAdapter();
  // const models = [
  //   // adapter.from();
  //   {
  //     name: "User",
  //     // more options here
  //   },
  // ];
  // const schemas = new Map<string, z.AnyZodObject>();
  // for (const model of models) {
  //   const schema = adapter.toZod(model);
  //   schemas.set(model.name, schema);
  // }

  const adapter = options?.adapter ?? new DefaultAdapter();

  return {
    ["schema"]: {
      get: () =>
        z.object({
          hello: z.string().default("world"),
        }) satisfies ReturnType<typeof adapter.toZod>,
    },
  };
};

export default zq;
