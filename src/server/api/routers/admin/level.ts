import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import z from 'zod'

export const adminLevelRouter = createTRPCRouter({
    getLevelList: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.levelIndex.findMany();
    }),
});
