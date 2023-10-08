import { prisma } from "./client";
import { z } from "zod";
import { Prisma } from "@prisma/client";
// iterate over all models
const models = Prisma.dmmf.datamodel.models;
console.log(models);
const ex = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().int().positive(),
  role: z.enum(["USER", "ADMIN"]),
  posts: z.array(
    z.object({
      title: z.string(),
      content: z.string(),
      published: z.boolean(),
    }),
  ),
});
// const zodifyField = (field: Prisma.DMMF.Field): z.ZodObject<any, "strict", any> => {
//   const zodType = (() => {
//     switch (field.type) {
//       case "String":
//         return z.string();
//       case "Int":
//         return z.number();
//       case "Boolean":
//         return z.boolean();
//       case "DateTime":
//         return z.date();
//       case "Json":
//         return z.record(z.any());
//       default:
//         return z.unknown();
//     }
//   })();
//   return zodType;
// }

for (const model of models) {
  console.log(model.name);

  // iterate over all fields
  for (const field of model.fields) {
    console.log("\t" + field.name, field.type, field.kind);
  }
}
