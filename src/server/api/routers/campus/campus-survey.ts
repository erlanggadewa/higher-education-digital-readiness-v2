import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { z } from '@/utils/id-zod';
import { HelperCampus } from './helper/helper-reviewer-campus';

export const campusSurveyRouter = createTRPCRouter({
  getCampusSurvey: protectedProcedure
    .input(
      z.object({
        campusId: z.string().min(1).cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.formGroup.findMany({
        where: {
          isActive: true,
          isPublished: true,
          roleOnFormGroup: {
            some: {
              role: 'campus',
            },
          },
          variableOnFormGroup: {
            some: {},
          },
        },
        include: {
          variableOnFormGroup: {
            include: {
              variable: { select: { id: true, name: true } },
              campusSurveyLog: {
                where: { campusId: input.campusId },
              },
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      });
      const totalVariable = data.map((item) => {
        return item.variableOnFormGroup.flatMap((item2) => {
          return item2.variable;
        }).length;
      });
      console.log('🚀 ~ totalVariable ~ totalVariable:', totalVariable);
      console.log('🚀 data ~ File: campus-survey.ts');
      console.dir(data, { depth: null });
      console.log('🔚 data ~ File: campus-survey.ts');
      const result = data.map((item, index) => {
        return {
          formGroupId: item.id,
          formGroupName: item.name,
          totalVariable: item.variableOnFormGroup.length,
          year: item.year,
          description: item.description,
          status: HelperCampus.determineStatus(
            item.variableOnFormGroup.flatMap((variable) => {
              return variable.campusSurveyLog.flatMap((log) => {
                return log.status;
              });
            }),
            totalVariable[index],
          ),
          takeTime: item.variableOnFormGroup
            .flatMap((variable) => {
              return variable.campusSurveyLog.flatMap((log) => {
                return log.createdAt;
              });
            })
            .sort((a, b) => Number(b) - Number(a))[0],
        };
      });
      return result;
    }),
});
