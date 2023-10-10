import { z } from "zod";

// eslint-disable-next-line no-console
console.info(`
  Thanks for installing 'zod-query'!
  This is the 0.0.4 version with no functionality.
`);

interface IAdapter<C, Z> {
  // C = Client, Z = Zod
  toZod: (input: C) => Z; // magically go from client to zod
}

type Options<T> = {
  adapter: Adapter<T>;
};

class PrismaAdapter<C> implements IAdapter<C, z.AnyZodObject> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toZod(_input: C) {
    // C is client of prisma
    return z.object({});
  }
}

class DefaultAdapter<C> implements IAdapter<C, z.AnyZodObject> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toZod() {
    return z.object({});
  }
}

type Adapter<T> = PrismaAdapter<T>;

// The client we make easy to use
export type ZodQuery<T> = {
  get: () => T;
};

export const zq = <T>(options?: Options<T>) => {
  // eslint-disable-next-line no-console
  console.log(options);
  const adapter = options?.adapter ?? new DefaultAdapter<T>();
  const schemas = adapter.toZod({} as T);

  return {
    get: () => schemas,
  };
};
