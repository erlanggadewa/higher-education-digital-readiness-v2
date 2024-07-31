import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { z } from '@/utils/id-zod';

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
              campusSurveyLog: true,
            },
          },
        },
      });
      console.log('🚀 -------------------------------------------------------🚀');
      console.log('🚀 ~ getFormGroup:protectedProcedure.query ~ data:', data);
      console.log('🚀 -------------------------------------------------------🚀');

      const result = data.map((item) => {
        return {
          id: item.id,
          formGroupName: item.name,
          totalVariable: item.variableOnFormGroup.length,
          status:
            item.variableOnFormGroup
              .map((variable) => {
                const totalReviewed = variable.campusSurveyLog.filter((log) => log.status === 'REVIEWED').length;
                if (totalReviewed === variable.campusSurveyLog.length) {
                  return 'REVIEWED';
                } else {
                  return 'WAITING';
                }
              })
              .find((status) => status === 'REVIEWED') ?? 'WAITING',
        };
      });
      return result;
    }),
});
