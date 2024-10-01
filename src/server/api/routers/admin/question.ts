import {createTRPCRouter, protectedProcedure} from '@/server/api/trpc';
import z from 'zod'

export const adminQuestionRouter = createTRPCRouter({
    getSurveyQuestionByYear: protectedProcedure.input(z.string()).query(async ({ctx, input}) => {
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
    updatePublishedQuestion: protectedProcedure.input(z.object({
        id: z.string(),
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
    getQuestion: protectedProcedure.input(z.object({
        variableId: z.string(),
        formGroupId: z.string(),
    })).query(async ({ctx, input}) => {
        const [variable, formGroup, data] = await Promise.all([
            ctx.db.variable.findUnique({
                where: {
                    id: input.variableId,
                }
            }),
            ctx.db.formGroup.findUnique({
                where: {
                    id: input.formGroupId,
                },
            }),
            ctx.db.variableOnFormGroup.findFirst({
                where: {
                    variableId: input.variableId,
                    formGroupId: input.formGroupId,
                },
                include: {
                    question: {
                        where: {
                            isActive: true,
                        },
                        orderBy: {
                            createdAt: 'asc'
                        },
                        include: {
                            option: true,
                        }
                    },
                },
            })
        ])
        return {
            variable,
            formGroup,
            question: data?.question.map((item) => ({
                ...item,
                optionJoin: item.option.map((e, index) => String.fromCharCode(97 + index) + '. ' + e.value + ' (' + e.point + ' poin)').join('<br>')
            }))
        };
    }),
    getQuestionDetail: protectedProcedure
        .input(z.string())
        .query(async ({ctx, input}) => {
            return ctx.db.question.findUnique({
                where: {
                    id: input,
                },
                include: {
                    option: true,
                }
            });
        }),
    createQuestion: protectedProcedure
        .input(z.object({
            formGroupId: z.string().cuid(),
            variableId: z.string().cuid(),
            year: z.string(),
            question: z.string(),
            options: z.array(z.object({
                option: z.string(),
                point: z.number(),
            }))
        }))
        .mutation(async ({ctx, input}) => {
            const variableFormGroup = await ctx.db.variableOnFormGroup.findFirst({
                where: {
                    formGroupId: input.formGroupId,
                    variableId: input.variableId,
                }
            });
            return ctx.db.question.create({
                data: {
                    question: input.question,
                    year: input.year,
                    variableOnForm: {
                        connect: {
                            id: variableFormGroup?.id,
                        },
                    },
                    option: {
                        createMany: {
                            data: input.options.map((item) => ({
                                value: item.option,
                                point: item.point,
                            }))
                        }
                    }
                }
            });
        }),
    updateQuestion: protectedProcedure
        .input(z.object({
            id: z.string(),
            question: z.string(),
            options: z.array(z.object({
                option: z.string(),
                point: z.number(),
            }))
        }))
        .mutation(async ({ctx, input}) => {
            return ctx.db.question.update({
                where: {
                    id: input.id,
                },
                data: {
                    question: input.question,
                    option: {
                        deleteMany: {},
                        createMany: {
                            data: input.options.map((item) => ({
                                value: item.option,
                                point: item.point,
                            }))
                        }
                    }
                }
            });
        }),
    removeQuestion: protectedProcedure
        .input(z.string())
        .mutation(async ({ctx, input}) => {
            return ctx.db.question.update({
                where: {
                    id: input,
                },
                data: {
                    isActive: false,
                }
            });
        }),
});
