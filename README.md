# PRProfessionals Technical Exam

This application is deployed at [`calc.joogie.link`](https://calc.joogie.link/)

## Usage

1. Sign in using a username, if it doesnt exist, the application creates that user. No password required
2. When hitting the equals (`=`), it saves that entry in the database
2. List of previous calculations are in [`/history`](https://calc.joogie.link/history)

## Technologies used:

#### [nextjs](https://nextjs.org/)

- Since the problem needed to talk to a database, there needs to be a server and nextjs provides that for me.

#### [tailwindcss](https://tailwindcss.com/)

- Tailwind CSS provides utility classes that makes it easy and quick to prototype and build consistent and professional looking apps. It is also very easy to customize its existing design system with your own.

- styles are defined in [`tailwind.config.cjs`](./tailwind.config.cjs)

#### [trpc](https://trpc.io/)

- I used trpc in my web application because it allows me to create end-to-end type-safe APIs in TypeScript, which helps catch errors early and ensures type safety throughout the codebase. Additionally, trpc's `react-query` wrapper makes it easy to integrate with the frontend, enabling efficient and declarative data fetching. This leads to a more maintainable and scalable codebase.

- server router is defined in [`root.ts`](./src/server/api/root.ts)
- client wrapper is defined in [`api.ts`](./src/utils/api.ts)

#### [prisma](https://www.prisma.io/)

- Prisma allows me to defined the shape of my database, indexes, etc. in a single file and it creates a typesafe typescript client that I can use in my codebase.

- schema is defined in [`schema.prisma`](./prisma/schema.prisma)

#### [postgres](https://www.postgresql.org/)

- The instructions didn't explicitly mention using postgres but its connection details had a port `5432` which is the default postgres port.

- The database is saved under `FSD_2022_JUGUILON`

## How it works

Initially, I was contemplating on whether to create a parser for the for the formula, checking if its valid and creating an AST based on the equation. `WARNING: this should not be done in a real application` but to keep things simple, I used the native [`eval`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) function to test the equation. It throws an error when the given formula is invalid and returns an output otherwise.

---

Created with ☕ by Prince Carlo Juguilon
