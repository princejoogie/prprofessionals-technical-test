import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const calculationsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.calculation.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: { createdAt: "desc" },
    });
  }),
  clear: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.calculation.deleteMany({
      where: { userId: ctx.session.user.id },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        expression: z.string(),
        result: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.calculation.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
    }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
