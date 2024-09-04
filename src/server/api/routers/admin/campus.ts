import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const adminCampusRouter = createTRPCRouter({
  getListCampus: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.campusUser.findMany({
      where: {
        role: 'campus',
      },
    });
  }),
});
