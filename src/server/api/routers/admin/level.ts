import {createTRPCRouter, protectedProcedure} from '@/server/api/trpc';
import z from 'zod'

export const adminLevelRouter = createTRPCRouter({
    getLevelList: protectedProcedure.query(async ({ctx}) => {
        return ctx.db.levelIndex.findMany({
            orderBy: [{
                minPoint: 'asc',
            }, {
                maxPoint: 'asc',
            }]
        });
    }),
    getDetailLevel: protectedProcedure
        .input(z.string().cuid())
        .query(async ({ctx, input}) => {
            return ctx.db.levelIndex.findUnique({
                where: {
                    id: input,
                },
            });
        }),
    createLevel: protectedProcedure
        .input(z.object({
            nama: z.string().min(1),
            deskripsi: z.string().min(1),
            minPoint: z.number().min(0),
            maxPoint: z.number().min(0),
        }))
        .mutation(async ({ctx, input}) => {
            return ctx.db.levelIndex.create({
                data: {
                    value: input.nama,
                    description: input.deskripsi,
                    minPoint: input.minPoint,
                    maxPoint: input.maxPoint,
                },
            });
        }),
    updateLevel: protectedProcedure
        .input(z.object({
            id: z.string().cuid(),
            nama: z.string().min(1),
            deskripsi: z.string().min(1),
            minPoint: z.number(),
            maxPoint: z.number(),
        }))
        .mutation(async ({ctx, input}) => {
            return ctx.db.levelIndex.update({
                where: {
                    id: input.id,
                },
                data: {
                    value: input.nama,
                    description: input.deskripsi,
                    minPoint: input.minPoint,
                    maxPoint: input.maxPoint,
                },
            });
        }),
    removeLevel: protectedProcedure
        .input(z.string().cuid())
        .mutation(async ({ctx, input}) => {
            return ctx.db.levelIndex.delete({
                where: {
                    id: input,
                },
            });
        }),
});
