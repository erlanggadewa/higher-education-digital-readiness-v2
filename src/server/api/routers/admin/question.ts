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
        const data = await ctx.db.variableOnFormGroup.findFirst({
            where: {
                variableId: input.variableId,
                formGroupId: input.formGroupId,
            },
            include: {
                formGroup: true,
                question: {
                    include: {
                        option: true,
                    }
                },
                variable: true,
            },
        });
        return {
            ...data,
            question: data?.question.map((item) => ({
                ...item,
                optionJoin: item.option.map((e, index) => String.fromCharCode(97+index)+ '. ' + e.value + ' (' + e.point + ' poin)').join('<br>')
            }))
        };
    }),
});
