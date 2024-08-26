import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { z } from '@/utils/id-zod';
import { HelperDashboardAdmin } from './helper/helper-dashboard-admin';

export const adminDashboardRouter = createTRPCRouter({
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
          formGroupId: item.id,
          formGroupName: item.name,
          totalVariable: item.variableOnFormGroup.length,
          // status: HelperReviewerCampus.determineStatus(
          //   item.variableOnFormGroup.flatMap((variable) => {
          //     return variable.campusSurveyLog.flatMap((log) => {
          //       return log.status;
          //     });
          //   }),
          // ),
        };
      });
      return result;
    }),

  // getSelectedFormGroup: protectedProcedure
  //   .input(
  //     z.object({
  //       formGroupId: z.string().min(1).cuid(),
  //     }),
  //   )
  //   .query(async ({ ctx, input }) => {
  //     const [variable, campus, formGroup] = await Promise.all([
  //       ctx.db.variable.findMany(),
  //       ctx.db.campus.findMany({
  //         where: {
  //           statusPt: true,
  //           campusSurveyLog: {
  //             some: {
  //               variableOnFormGroup: {
  //                 formGroupId: input.formGroupId,
  //               },
  //             },
  //           },
  //         },
  //         include: {
  //           campusUser: {
  //             select: {
  //               image: true,
  //               email: true,
  //               name: true,
  //             },
  //           },
  //           campusSurveyLog: {
  //             orderBy: { updatedAt: 'desc' },
  //             where: {
  //               variableOnFormGroup: {
  //                 formGroupId: input.formGroupId,
  //               },
  //             },
  //           },
  //         },
  //       }),
  //       ctx.db.formGroup.findUnique({
  //         where: { id: input.formGroupId, isActive: true, isPublished: true },
  //         select: {
  //           name: true,
  //         },
  //       }),
  //     ]);
  //     const data = {
  //       formGroup: {
  //         formGroupId: input.formGroupId,
  //         formGroupName: formGroup?.name,
  //         totalVariable: variable.length,
  //       },
  //       campus: campus
  //         .filter((item) => item.campusSurveyLog.length === variable.length)
  //         .map((item) => {
  //           return {
  //             campusId: item.campusId,
  //             imgUrl: item.campusUser?.image,
  //             email: item.campusUser?.email,
  //             campusName: item.campusUser?.name,
  //             submitTime: item.campusSurveyLog[0]?.updatedAt,
  //             status: HelperReviewerCampus.determineStatus(item.campusSurveyLog.map((log) => log.status)),
  //           };
  //         }),
  //     };

  //     return data;
  //   }),
});
