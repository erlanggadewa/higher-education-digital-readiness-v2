import {createTRPCRouter, protectedProcedure} from '@/server/api/trpc';
import z from 'zod'

export const adminFormGroupRouter = createTRPCRouter({
    getFormGroupByYear: protectedProcedure
        .input(z.string())
        .query(async ({ctx, input}) => {
            return ctx.db.formGroup.findMany({
                where: {
                    year: input,
                    isActive: true,
                },
                include: {
                    variableOnFormGroup: true,
                }
            });
        }),
    getFormGroupById: protectedProcedure
        .input(z.string().min(1).cuid())
        .query(async ({ctx, input}) => {
            const formGroup = await ctx.db.formGroup.findUnique({
                where: {
                    id: input,
                    isActive: true,
                },
            });
            const variable = await ctx.db.variable.findMany({
                include: {
                    variableOnFormGroup: {
                        where: {
                            formGroupId: formGroup?.id
                        },
                        include: {
                            _count: {
                                select: {
                                    question: {where: {isActive: true}},
                                },
                            },
                            variable: true,
                        }
                    }
                }
            })
            return {
                formGroupId: formGroup?.id,
                formGroupName: formGroup?.name,
                formGroupDescription: formGroup?.description,
                isPublished: formGroup?.isPublished,
                year: formGroup?.year,
                variable: variable.map(e => ({
                    ...e,
                    totalQuestion: e.variableOnFormGroup.reduce((acc, obj) => acc + obj._count?.question, 0)
                })),
            };
        }),
    updatePublishedFormGroup: protectedProcedure
        .input(z.object({
            id: z.string().min(1).cuid(),
            isPublished: z.boolean(),
        }))
        .mutation(async ({ctx, input}) => {
            return ctx.db.formGroup.update({
                where: {
                    id: input.id,
                },
                data: {
                    isPublished: input.isPublished,
                },
            });
        }),
    createFormGroup: protectedProcedure
        .input(z.object({
            name: z.string().min(1),
            description: z.string().min(1),
            isPublished: z.boolean(),
            year: z.string().min(4),
        }))
        .mutation(async ({ctx, input}) => {
            return ctx.db.formGroup.create({
                data: {
                    name: input.name,
                    description: input.description,
                    isPublished: input.isPublished,
                    isActive: true,
                    year: input.year,
                },
            });
        }),
    updateFormGroup: protectedProcedure
        .input(z.object({
            id: z.string().min(1).cuid(),
            name: z.string().min(1),
            description: z.string().min(1),
            isPublished: z.boolean(),
        }))
        .mutation(async ({ctx, input}) => {
            return ctx.db.formGroup.update({
                where: {
                    id: input.id,
                },
                data: {
                    name: input.name,
                    description: input.description,
                    isPublished: input.isPublished,
                },
            });
        }),
    removeFormGroup: protectedProcedure
        .input(z.string().min(1).cuid())
        .mutation(async ({ctx, input}) => {
            return ctx.db.formGroup.update({
                where: {
                    id: input,
                },
                data: {
                    isActive: false,
                },
            });
        }),
});
