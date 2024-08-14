import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { z } from '@/utils/id-zod';

export const reviewerCampusRouter = createTRPCRouter({
  getSelectedProfilCampusReview: protectedProcedure
    .input(
      z.object({
        formGroupId: z.string().min(1).cuid(),
        campusUserId: z.string().min(1).cuid(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const formGroup = await ctx.db.formGroup.findUniqueOrThrow({
        where: { id: input.formGroupId, isActive: true, isPublished: true },
        omit: {
          createdAt: true,
          updatedAt: true,
        },
      });
      const campus = await ctx.db.campus.findUniqueOrThrow({
        where: { campusId: input.campusUserId },
        select: {
          campusId: true,
          campusUser: {
            select: { image: true, email: true, name: true },
          },
        },
      });

      const data = {
        formGroupId: formGroup?.id,
        formGroupName: formGroup?.name,
        formGroupDescription: formGroup?.description,
        campus,
      };
      console.log('🚀 formGroup ~ File: campus.ts');
      console.dir(data, { depth: null });
      console.log('🔚 formGroup ~ File: campus.ts');
      return data;
    }),

  getMappedVariableOnFormGroup: protectedProcedure
    .input(
      z.object({
        formGroupId: z.string().min(1).cuid(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.db.variable.findMany({
        where: { variableOnFormGroup: { some: { formGroupId: input.formGroupId } } },
        omit: {
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { alias: 'asc' },
      });

      return data;
    }),

  getSelectedSurveyCampusReview: protectedProcedure
    .input(
      z.object({
        formGroupId: z.string().min(1).cuid(),
        campusUserId: z.string().min(1).cuid(),
        variableId: z.string().cuid().min(1),
      }),
    )
    .query(async ({ input, ctx }) => {
      const formGroup = await ctx.db.formGroup.findUniqueOrThrow({
        where: { id: input.formGroupId, isActive: true, isPublished: true },
        omit: {
          createdAt: true,
          updatedAt: true,
        },
        include: {
          variableOnFormGroup: {
            where: { variableId: input.variableId },
            omit: {
              createdAt: true,
              updatedAt: true,
            },
            include: {
              variable: {
                omit: {
                  createdAt: true,
                  updatedAt: true,
                },
              },
              question: {
                where: { isActive: true },
                omit: {
                  createdAt: true,
                  updatedAt: true,
                },
                include: {
                  campusAnswer: {
                    omit: {
                      createdAt: true,
                      updatedAt: true,
                    },
                    where: { campusId: input.campusUserId },
                    include: {
                      revisionOption: { omit: { createdAt: true, updatedAt: true } },
                      option: { omit: { createdAt: true, updatedAt: true } },
                    },
                  },
                  option: {
                    omit: {
                      createdAt: true,
                      updatedAt: true,
                    },
                    // include: {
                    //   campusAnswer: {
                    //     omit: {
                    //       createdAt: true,
                    //       updatedAt: true,
                    //     },
                    //     where: { campusId: input.campusUserId },
                    //   },
                    //   reviewerCampusAnswer: {
                    //     omit: {
                    //       createdAt: true,
                    //       updatedAt: true,
                    //     },
                    //     where: { campusId: input.campusUserId },
                    //   },
                    // },
                  },
                },
              },
            },
          },
        },
      });
      const campus = await ctx.db.campus.findUniqueOrThrow({
        where: { campusId: input.campusUserId },
        select: {
          campusId: true,
          campusUser: {
            select: { image: true, email: true, name: true },
          },
        },
      });

      const data = {
        formGroupId: formGroup?.id,
        formGroupName: formGroup?.name,
        formGroupDescription: formGroup?.description,
        campus,
        variable: {
          id: formGroup?.variableOnFormGroup[0]?.variableId,
          alias: formGroup?.variableOnFormGroup[0]?.variable?.alias,
          name: formGroup?.variableOnFormGroup[0]?.variable?.name,
          description: formGroup?.variableOnFormGroup[0]?.variable?.description,
        },
        question: formGroup?.variableOnFormGroup[0]?.question.map((q) => {
          return {
            answer: {
              reviewStatus: q.campusAnswer[0]?.answerStatus,
              reviewComment: q.campusAnswer[0]?.reviewComment,
            },
            ...q,
          };
        }),
      };

      return data;
    }),

  getModalSelectedSurveyCampusReview: protectedProcedure
    .input(
      z.object({
        formGroupId: z.string().min(1).cuid(),
        campusUserId: z.string().min(1).cuid(),
        variableId: z.string().cuid().min(1),
        questionId: z.string().min(1).cuid(),
        year: z.string().min(1).max(4),
      }),
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.db.question.findUniqueOrThrow({
        where: { id: input.questionId, isActive: true },
        include: {
          option: true,
          campusAnswer: {
            where: {
              campusId: input.campusUserId,
              questionId: input.questionId,
              year: input.year,
            },
            select: {
              id: true,
              reviewComment: true,
              option: { select: { id: true, value: true, point: true } },
              revisionOption: { select: { id: true, value: true, point: true } },
            },
          },
        },
      });
      console.log('🚀 formGroup ~ File: campus.ts');
      console.dir(data, { depth: null });
      console.log('🔚 formGroup ~ File: campus.ts');
      return data;
    }),
});
