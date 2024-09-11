import {createTRPCRouter, protectedProcedure} from '@/server/api/trpc';
import z from 'zod'

export const adminVariableRouter = createTRPCRouter({
    getListVariable: protectedProcedure
        .query(async ({ctx}) => {
            return ctx.db.variable.findMany();
        }),
    getDetailVariable: protectedProcedure
        .input(z.string().cuid())
        .query(async ({ctx, input}) => {
            return ctx.db.variable.findUniqueOrThrow({
                where: {
                    id: input,
                },
            });
        }),
    createVariable: protectedProcedure
        .input(z.object({
            nama: z.string(),
            alias: z.string(),
            deskripsi: z.string(),
        }))
        .mutation(async ({ctx, input}) => {
            return ctx.db.variable.create({
                data: {
                    name: input.nama,
                    alias: input.alias,
                    description: input.deskripsi,
                },
            });
        }),
    updateVariable: protectedProcedure
        .input(z.object({
            id: z.string().cuid(),
            nama: z.string(),
            alias: z.string(),
            deskripsi: z.string(),
        }))
        .mutation(async ({ctx, input}) => {
            return ctx.db.variable.update({
                where: {
                    id: input.id,
                },
                data: {
                    name: input.nama,
                    alias: input.alias,
                    description: input.deskripsi,
                },
            });
        }),
    removeVariable: protectedProcedure
        .input(z.string().cuid())
        .mutation(async ({ctx, input}) => {
            return ctx.db.variable.delete({
                where: {
                    id: input,
                },
            });
        }),
});
