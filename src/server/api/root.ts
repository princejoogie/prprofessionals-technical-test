import { createTRPCRouter } from "~/server/api/trpc";
import { calculationsRouter } from "~/server/api/routers/calculations";

export const appRouter = createTRPCRouter({
  calculations: calculationsRouter,
});

export type AppRouter = typeof appRouter;
