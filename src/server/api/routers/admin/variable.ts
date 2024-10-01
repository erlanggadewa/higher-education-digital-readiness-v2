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
    getLevelByVariableId: protectedProcedure
        .input(z.string().cuid())
        .query(async ({ctx, input}) => {
            const [variable, level, levelVariable] = await Promise.all([
                ctx.db.variable.findUnique({
                    where: {
                        id: input,
                    },
                }),
                ctx.db.levelIndex.findMany({
                    orderBy: [{
                        minPoint: 'asc',
                    }, {
                        maxPoint: 'asc',
                    }]
                }),
                ctx.db.levelIndexOnVariables.findMany({
                    where: {
                        variableId: input,
                    },
                })
            ]);

            return {
                variable,
                level: level.map((l) => {
                    const levelVar = levelVariable.find((lv) => lv.levelIndexId === l.id);
                    return {
                        ...l,
                        descriptionLevelVariable: levelVar?.descriptionLevelVariable,
                    };
                })
            };
        }),
    getLevelDetailById: protectedProcedure
        .input(z.object({
            levelId: z.string().cuid(),
            variableId: z.string().cuid(),
        }))
        .query(async ({ctx, input}) => {
            const [variable, level, levelVariable] = await Promise.all([
                ctx.db.variable.findUnique({
                    where: {
                        id: input.variableId,
                    },
                }),
                ctx.db.levelIndex.findUnique({
                    where: {
                        id: input.levelId,
                    },
                }),
                ctx.db.levelIndexOnVariables.findFirst({
                    where: {
                        variableId: input.variableId,
                        levelIndexId: input.levelId,
                    },
                }),
            ]);
            return {
                variable,
                level,
                levelVariable,
            };
        }),
    updateLevelDescription: protectedProcedure
        .input(z.object({
            id: z.string().cuid().nullable(),
            levelId: z.string().cuid(),
            variableId: z.string().cuid(),
            description: z.string(),
        }))
        .mutation(async ({ctx, input}) => {
            if (input.id) {
                return ctx.db.levelIndexOnVariables.update({
                    where: {
                        id: input.id,
                    },
                    data: {
                        descriptionLevelVariable: input.description,
                    },
                });
            } else {
                return ctx.db.levelIndexOnVariables.create({
                    data: {
                        descriptionLevelVariable: input.description,
                        levelIndexId: input.levelId,
                        variableId: input.variableId,
                    },
                });
            }
        }),
});
