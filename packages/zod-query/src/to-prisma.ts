import { z } from "zod";

type ValidZodDef = ZodDefs["typeName"] extends ZodValid ? ZodDefs : never;

type ZodDefs =
  | z.ZodStringDef
  | z.ZodNumberDef
  | z.ZodBooleanDef
  | z.ZodDefaultDef
  | z.ZodAnyDef
  | z.ZodUndefinedDef
  | z.ZodNullDef
  | z.ZodMapDef
  | z.ZodDefaultDef
  | z.ZodVoidDef
  | z.ZodUnknownDef
  | z.ZodNeverDef
  | z.ZodFunctionDef
  | z.ZodDateDef
  | z.ZodArrayDef
  | z.ZodObjectDef
  | z.ZodUnionDef
  | z.ZodIntersectionDef
  | z.ZodTupleDef
  | z.ZodRecordDef
  | z.ZodLazyDef
  | z.ZodLiteralDef
  | z.ZodEnumDef
  | z.ZodEffectsDef
  | z.ZodNativeEnumDef
  | z.ZodPromiseDef
  | z.ZodOptionalDef
  | z.ZodNullableDef;

const zodValid = [
  z.ZodFirstPartyTypeKind.ZodNumber,
  z.ZodFirstPartyTypeKind.ZodString,
  z.ZodFirstPartyTypeKind.ZodBoolean,
  // z.ZodFirstPartyTypeKind.ZodDefault,
  z.ZodFirstPartyTypeKind.ZodUndefined,
  z.ZodFirstPartyTypeKind.ZodNull,
  z.ZodFirstPartyTypeKind.ZodNullable,
  z.ZodFirstPartyTypeKind.ZodOptional,
  z.ZodFirstPartyTypeKind.ZodArray,
  z.ZodFirstPartyTypeKind.ZodObject,
] as const;
type ZodValid = (typeof zodValid)[number];

// export const toPrisma = async <T extends z.ZodTypeAny>(schema: T): Promise<string> => {
//   // first determine the type of the schema
//   const type = schema._def.typeName;
//   console.log(`type: ${type}`);
//   if (zodValid.includes(type)) {
//     console.log("is valid");
//     return schema.toString();
//   }
//   throw new Error(`Invalid schema type: ${type}`);
// };

export const toPrisma = async <T extends z.AnyZodObject>(schema: T): Promise<string> => {
  // read the keys, then read the types and properties, then generate the prisma schema string

  const keys = Object.keys(schema.shape);
  console.log(keys);
  for (const key in schema.shape) {
    // console.log(schema.shape[key]);

    const value: z.ZodType<z.ZodTypeAny, ZodDefs> = schema.shape[key];
    const type = value._def.typeName;
    if (type === z.ZodFirstPartyTypeKind.ZodDefault) {
      console.log(
        `key: ${key}, type: ${type}, innerType: ${
          value._def.innerType._def.typeName
        }, default: ${value._def.defaultValue()}`,
      );
    }

    // const {
    //   _def: value,
    // }: { _def: z.ZodStringDef | z.ZodNumberDef | z.ZodBooleanDef | z.ZodDefaultDef | z.ZodAnyDef } =
    //   schema.shape[key];
    // const { typeName } = value;
    // if (typeName === z.ZodFirstPartyTypeKind.ZodString) {
    //   console.log(key, typeName, "is String");
    // }
    // if (typeName === z.ZodFirstPartyTypeKind.ZodNumber) {
    //   console.log(key, typeName, "is Number");
    // }
    // if (typeName === z.ZodFirstPartyTypeKind.ZodBoolean) {
    //   console.log(key, typeName, "is Boolean");
    // }
    // if (typeName === z.ZodFirstPartyTypeKind.ZodDefault) {
    //   console.log(key, typeName, "has Default");
    // }
  }

  return schema.toString();
};
