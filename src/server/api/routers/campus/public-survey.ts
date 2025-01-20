import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { z } from '@/utils/id-zod';

export const publicSurveyRouter = createTRPCRouter({
  getPublicSurvey: protectedProcedure
    .input(
      z.object({
        campusId: z.string().min(1).cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.roleOnFormGroup.findMany({
        where: {
          role: {
            notIn: ['campus', 'admin', 'reviewer'],
          },
          formGroup: {
            isActive: true,
            isPublished: true,
            variableOnFormGroup: {
              every: {
                question: {
                  none: {
                    question: undefined,
                    option: {
                      none: {
                        value: undefined,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        include: {
          formGroup: true,
        },
        orderBy: {
          formGroup: { name: 'asc' },
        },
      });

      const listUrlPublicSurvey = await ctx.db.$transaction(
        data.map((el) =>
          ctx.db.urlPublicSurvey.upsert({
            where: {
              role_campusId_formGroupId_year: {
                role: el.role,
                formGroupId: el.formGroup.id,
                campusId: input.campusId,
                year: el.formGroup.year,
              },
            },
            create: { role: el.role, formGroupId: el.formGroup.id, campusId: input.campusId, year: el.formGroup.year },
            update: {},
          }),
        ),
      );

      // * Delete urlPublicSurvey yang tidak ada di listUrlPublicSurvey untuk  menghindari data yang tidak terpakai
      await ctx.db.urlPublicSurvey.deleteMany({
        where: {
          id: { notIn: listUrlPublicSurvey.map((el) => el.id) },
          campusId: input.campusId,
        },
      });

      const result = data.map((item) => {
        return {
          roleOnFormGroupId: item.id,
          formGroupId: item.formGroup.id,
          name: item.formGroup.name,
          description: item.formGroup.description,
          role: item.role,
          year: item.formGroup.year,
          urlPublicSurveyId: listUrlPublicSurvey.find((el) => el.role === item.role && el.formGroupId === item.formGroup.id && el.year === item.formGroup.year)?.id,
        };
      });

      return result;
    }),
});
