import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { z } from '@/utils/id-zod';

export const campusDashboardRouter = createTRPCRouter({
  getDashboard: protectedProcedure
    .input(
      z.object({
        campusId: z.string().cuid().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const campus = await ctx.db.campus.findUnique({
        where: {
          campusId: input.campusId,
          statusPt: true,
        },
        omit: { createdAt: true, updatedAt: true },
        include: {
          campusUser: { omit: { password: true, createdAt: true, updatedAt: true } },
        },
      });
      const data = { campus: { ...campus } };
      return data;
    }),
});
