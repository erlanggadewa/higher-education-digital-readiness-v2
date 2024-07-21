import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const reviewerDashboardRouter = createTRPCRouter({
  getDashboard: protectedProcedure.query(({ ctx }) => {
    return ctx.db.variable.findFirst({
      orderBy: { createdAt: 'desc' },
    });
  }),
});
