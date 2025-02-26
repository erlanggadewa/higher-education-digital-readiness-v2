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
                    variableOnFormGroup: {
                        include: {
                            _count: {
                                select: {
                                    question: {where: {isActive: true}},
                                },
                            },
                            variable: true,
                        }
                    },
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
            const [role, variable] = await Promise.all([
                ctx.db.roleOnFormGroup.findMany({
                    where: {
                        formGroupId: formGroup?.id,
                    },
                    include: {
                        roleUser: true,
                    },
                }),
                ctx.db.variable.findMany({
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
                })])
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
                role: role.map(e => e.roleUser),
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
            role: z.array(z.string()).min(1),
        }))
        .mutation(async ({ctx, input}) => {
            return ctx.db.formGroup.create({
                data: {
                    name: input.name,
                    description: input.description,
                    isPublished: input.isPublished,
                    isActive: true,
                    year: input.year,
                    roleOnFormGroup: {
                        create: input.role.map((e) => ({
                            roleUser: {
                                connect: {
                                    role: e,
                                },
                            },
                        })),
                    }
                },
            });
        }),
    updateFormGroup: protectedProcedure
        .input(z.object({
            id: z.string().min(1).cuid(),
            name: z.string().min(1),
            description: z.string().min(1),
            isPublished: z.boolean(),
            role: z.array(z.string()).min(1),
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
                    roleOnFormGroup: {
                        deleteMany: {
                            formGroupId: input.id,
                        },
                        create: input.role.map((e) => ({
                            roleUser: {
                                connect: {
                                    role: e,
                                },
                            },
                        })),
                    }
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
