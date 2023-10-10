# Zod Query

Connect Zod as your ORM and query your database with typesafety and input validation out-of-box

## Installation

### NPM

```bash
npm install zod-query
```

### Yarn

```bash
yarn add zod-query
```

### PNPM

```bash
pnpm add zod-query
```

## Timeline

### Active development

- [ ] Runtime Zod support for Prisma (get Zod types from generated Prisma client)
- [ ] Create adapter spec for easy-to-make adapters for other ORMs/datasources.

### Planned features

- [ ] Runtime Zod support for Drizzle (get Zod types from Drizzle schemas)
- [ ] Support for raw SQL queries
- [ ] Data validation for input in adapters
- [ ] Act-as-DTO for models, get a specific data shape from a model
- [ ] Cli tool to select provider (Prisma, Drizzle, etc) and generate SQL queries for no-ORM usage

## Usage

### Using an adapter (recommended)

Under the hood, zod-query will convert the model to a zod schema and use that to validate and query data.

#### Prisma

```ts
import { zq } from "zod-query";
import { PrismaClient } from "@prisma/client";
import { adapter } from "zod-query/adapters/orm/prisma";

const prisma = new PrismaClient();
// lets say we have a prisma model called 'users'

const client = zq({ adapter: adapter(prisma) }); // you can pass any adapter, even your own
// ^ this is typeof: ZodQuery<PrismaClient>
const users = await client.users.all(); // somewhat different from prisma, but still typesafe

// you can even use where clauses
const users = await client.users.all({
  where: {
    id: 1,
  },
});

// or create a new user, this will then be validated by zod.
const user = await client.users.create({
  name: "John Doe",
});
```

#### DrizzleORM

```ts
import { zq } from "zod-query";
import drizzle from "./db/drizzle"; // import your drizzle instance
import { adapter } from "zod-query/adapters/orm/drizzle";
// or: import {drizzle} from "zod-query/adapters/orm";

const client = zq({ adapter: adapter(drizzle) });
const users = await client.users.all();
```

### Using Zod as single source of truth

```ts
import { z } from "zod";
import { zq } from "zod-query";
import { pg } from "zod-query/adapters/db/pg"; // postgres adapter, no orm needed

const client = zq({
  adapter: pg({
    connectionString: "postgres://user:password@localhost:5432/db",
  }),
  // this way we can use zod as single source of truth, even sync the models with the database using raw SQL.
  models: {
    users: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
    }),
  },
});

// now we can use the client to query the database
const users = await client.users.all();
```
