import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { z } from '@/utils/id-zod';

export const publicSurveyRouter = createTRPCRouter({
  getSelectedFormGroup: protectedProcedure
    .input(
      z.object({
        urlPublicSurveyId: z.string().min(1).cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const urlPublicSurvey = await ctx.db.urlPublicSurvey.findUniqueOrThrow({ where: { id: input.urlPublicSurveyId } });
      // const formGroup = await ctx.db.formGroup.findUnique({
      //   where: {
      //     id: urlPublicSurvey.formGroupId,
      //     isActive: true,
      //     isPublished: true,
      //     variableOnFormGroup: {
      //       some: {
      //         question: {
      //           none: {
      //             question: undefined,
      //             option: {
      //               none: {
      //                 value: undefined,
      //               },
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      //   include: {
      //     variableOnFormGroup: {
      //       include: {
      //         _count: {
      //           select: {
      //             question: { where: { isActive: true } },
      //             publicSurveyLog: { where: { publicUserId: urlPublicSurvey.publicUserId } },
      //           },
      //         },
      //         variable: true,
      //         publicSurveyLog: {
      //           where: { publicUserId: urlPublicSurvey.publicUserId },
      //         },
      //       },
      //     },
      //   },
      // });

      // const data = {
      //   formGroupId: formGroup?.id,
      //   formGroupName: formGroup?.name,
      //   formGroupDescription: formGroup?.description,
      //   year: formGroup?.year,
      //   variable:
      //     formGroup?.variableOnFormGroup.map((item) => {
      //       return {
      //         variableOnFormGroupId: item.id,
      //         variableAlias: item.variable.alias,
      //         variableName: item.variable.name,
      //         variableDescription: item.variable.description,
      //         status: item.publicSurveyLog[0]?.status === 'WAITING' ? 'Belum Disetujui' : item.publicSurveyLog[0]?.status === 'REVIEWED' ? 'Sudah Disetujui' : 'Menunggu Dikerjakan',
      //         takeTime: item.publicSurveyLog[0]?.createdAt,
      //         totalQuestion: item._count?.question,
      //       };
      //     }) ?? [],
      // };

      return [];
    }),
});
