/* eslint-disable no-console  */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const models = Prisma.dmmf.datamodel.models;
const main = async () => {
  for (const model of models) {
    console.log(`
    Model: ${model.name}
    Fields: ${model.fields
      .map((f) => `${f.name}: ${f.type}-${f.default}-${f.isReadOnly}-${f.isRequired}`)
      .join(", ")}
    `);
    const infered = getInferedFromPrisma(model);
  }
  const names = getModelListAsString(models);
};

const getModelListAsString = (models: Prisma.DMMF.Model[]): (keyof typeof models)[] => {
  return models.map((m) => m.name as keyof typeof models);
};

const getInferedFromPrisma = <T extends Prisma.DMMF.Model>(model: T) => {
  const infered = z.object(
    Object.fromEntries(
      model.fields.map((f) => {
        const typed = getZodTypeFromPrisma(f);

        return [f.name, typed];
      }),
    ),
  );

  return infered;
};

const ZodTyped = {
  String: z.string(),
  Int: z.number(),
  Boolean: z.boolean(),
  Unknown: z.unknown(),
} as const;

const Types = {
  String: "String",
  Int: "Int",
  Boolean: "Boolean",
} as const;

const ZodTypes = [Types.String, Types.Int, Types.Boolean] as const;
type ZodTypes = (typeof ZodTypes)[number];

type ReturnZodType<T extends Prisma.DMMF.Field["name"]> = T extends "String"
  ? z.ZodString
  : T extends "Int"
  ? z.ZodNumber
  : T extends "Boolean"
  ? z.ZodBoolean
  : z.ZodUnknown;

type Example = ReturnZodType<"String">;

const getZodTypeFromPrisma = <T extends Prisma.DMMF.Field>(
  field: T,
): ReturnZodType<T["name"]> => {
  let statement: z.ZodTypeAny;
  switch (field["name"]) {
    case Types.String:
      statement = ZodTyped.String;
      break;
    case Types.Int:
      statement = ZodTyped.Int;
      break;
    case Types.Boolean:
      statement = ZodTyped.Boolean;
      break;
    default:
      statement = ZodTyped.Unknown;
      break;
  }
  if (field.isReadOnly) {
    statement = statement.readonly();
  }
  return statement as ReturnZodType<T["name"]>;
};

const testSchema = z.object({
  hello: z.string().default("world"),
  test: z.number().default(1),
  bool: z.boolean().default(false),
});

main();
