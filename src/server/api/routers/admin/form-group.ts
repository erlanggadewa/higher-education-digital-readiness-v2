import {createTRPCRouter, protectedProcedure} from '@/server/api/trpc';
import z from 'zod'

export const adminFormGroupRouter = createTRPCRouter({
    getFormGroupByYear: protectedProcedure.input(z.string()).query(async ({ctx, input}) => {
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
                year: formGroup?.year,
                variable: variable.map(e => ({
                    ...e,
                    totalQuestion: e.variableOnFormGroup.reduce((acc, obj) => acc + obj._count?.question, 0)
                })),
            };
        }),
    updatePublishedFormGroup: protectedProcedure.input(z.object({
        id: z.string().min(1).cuid(),
        isPublished: z.boolean(),
    })).mutation(async ({ctx, input}) => {
        return ctx.db.formGroup.update({
            where: {
                id: input.id,
            },
            data: {
                isPublished: input.isPublished,
            },
        });
    }),
});
