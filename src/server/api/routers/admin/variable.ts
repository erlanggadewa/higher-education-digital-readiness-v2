import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const adminVariableRouter = createTRPCRouter({
  getListVariable: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.variable.findMany();
  }),
});
