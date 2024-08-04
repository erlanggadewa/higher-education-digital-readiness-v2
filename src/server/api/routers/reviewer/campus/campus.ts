import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { z } from '@/utils/id-zod';
import { HelperReviewerCampus } from './helper/helper-reviewer-campus';

export const reviewerCampusRouter = createTRPCRouter({
  getFormGroup: protectedProcedure
    .input(
      z.object({
        year: z.string().min(4).max(4),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.formGroup.findMany({
        where: {
          isActive: true,
          isPublished: true,
          year: input.year,
          roleOnFormGroup: {
            some: {
              role: 'campus',
            },
          },
          variableOnFormGroup: {
            some: {
              campusSurveyLog: {
                some: {},
              },
            },
          },
        },
        include: {
          variableOnFormGroup: {
            include: {
              campusSurveyLog: {},
            },
          },
        },
      });

      const result = data.map((item) => {
        return {
          id: item.id,
          formGroupName: item.name,
          totalVariable: item.variableOnFormGroup.length,
          status: HelperReviewerCampus.determineStatus(
            item.variableOnFormGroup.flatMap((variable) => {
              return variable.campusSurveyLog.flatMap((log) => {
                return log.status;
              });
            }),
          ),
        };
      });
      return result;
    }),
});
