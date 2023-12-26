/* eslint-disable no-console  */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";
import { toPrisma } from "./to-prisma";

const testSchema = z.object({
  hello_withdefault: z.string().default("world"),
  hello: z.string(),
  test: z.number(),
  test_withdefault: z.number().default(1),
  bool: z.boolean(),
  bool_withdefault: z.boolean().default(false),
});
const myStr = z.string().nullable();

const main = async () => {
  const myrouter = await router({
    test: testSchema,
  });
  const result = await myrouter?.test?.get("1");
  console.log(result);
};

type IRouter<T> = {
  [key: string]: {
    get: (id: string) => Promise<T>;
    list: () => Promise<T[]>;
    create: (data: T) => Promise<T>;
    update: (data: T) => Promise<T>;
    delete: (data: T) => Promise<T>;
  };
};

const router = async <T extends z.AnyZodObject>(models: {
  [key: string]: T;
}): Promise<IRouter<T>> => {
  const keys = Object.keys(models);
  const router: IRouter<T> = {};
  for (const key of keys) {
    const model = models[key];
    if (!model) throw new Error(`Model ${key} not found`);
    router[key] = {
      get: async (id: string) => {
        return model.parse({ hello: "world", test: 1, bool: true }) as T;
      },
      list: async () => {
        return [];
      },
      create: async (data: T) => {
        return data;
      },
      update: async (data: T) => {
        return data;
      },
      delete: async (data: T) => {
        return data;
      },
    };
  }
  return router;
};

main();
