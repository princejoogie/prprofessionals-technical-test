import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const calculationsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.calculation.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
