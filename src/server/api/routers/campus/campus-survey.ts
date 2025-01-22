import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { z } from '@/utils/id-zod';
import { type Prisma } from '@prisma/client';
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

  getSelectedFormGroup: protectedProcedure
    .input(
      z.object({
        campusId: z.string().min(1).cuid(),
        formGroupId: z.string().min(1).cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const formGroup = await ctx.db.formGroup.findUnique({
        where: {
          id: input.formGroupId,
          isActive: true,
          isPublished: true,
          variableOnFormGroup: {
            some: {
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
        include: {
          variableOnFormGroup: {
            include: {
              _count: {
                select: {
                  question: { where: { isActive: true } },
                  campusSurveyLog: { where: { campusId: input.campusId } },
                },
              },
              variable: true,
              campusSurveyLog: {
                where: { campusId: input.campusId },
              },
            },
          },
        },
      });

      const data = {
        formGroupId: formGroup?.id,
        formGroupName: formGroup?.name,
        formGroupDescription: formGroup?.description,
        year: formGroup?.year,
        variable:
          formGroup?.variableOnFormGroup.map((item) => {
            return {
              variableOnFormGroupId: item.id,
              variableAlias: item.variable.alias,
              variableName: item.variable.name,
              variableDescription: item.variable.description,
              status: item.campusSurveyLog[0]?.status === 'WAITING' ? 'Belum Disetujui' : item.campusSurveyLog[0]?.status === 'REVIEWED' ? 'Sudah Disetujui' : 'Menunggu Dikerjakan',
              takeTime: item.campusSurveyLog[0]?.createdAt,
              totalQuestion: item._count?.question,
            };
          }) ?? [],
      };

      return data;
    }),

  getQuestionSurvey: protectedProcedure
    .input(
      z.object({
        campusId: z.string().min(1).cuid(),
        variableOnFormGroupId: z.string().min(1).cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.variableOnFormGroup.findUniqueOrThrow({
        where: {
          id: input.variableOnFormGroupId,
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
        include: {
          formGroup: {
            omit: { createdAt: true, updatedAt: true },
          },
          variable: {
            omit: { createdAt: true, updatedAt: true },
          },
          campusSurveyLog: { where: { campusId: input.campusId } },
          question: {
            where: { isActive: true },
            omit: { createdAt: true, updatedAt: true },
            include: {
              campusAnswer: {
                omit: { createdAt: true, updatedAt: true },
                where: { campusId: input.campusId },
              },
              option: {
                omit: { createdAt: true, updatedAt: true },
              },
            },
          },
        },
      });

      return data;
    }),

  answerQuestion: protectedProcedure
    .input(
      z.object({
        campusId: z.string().min(1).cuid(),
        variableId: z.string().min(1).cuid(),
        variableOnFormGroupId: z.string().min(1).cuid(),
        year: z.string().min(1).max(4),
        answer: z
          .object({
            questionId: z.string().min(1).cuid(),
            answerId: z.string().min(1).cuid(),
          })
          .array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.$transaction(async (tx) => {
        const promises = [];
        for (const item of input.answer) {
          const payload: Prisma.CampusAnswerUncheckedCreateInput = {
            questionId: item.questionId,
            optionId: item.answerId,
            revisionOptionId: item.answerId,
            campusId: input.campusId,
            year: input.year,
            answerStatus: 'WAITING',
          };

          const promise = tx.campusAnswer.upsert({
            where: {
              questionId_campusId_year: {
                questionId: item.questionId,
                campusId: input.campusId,
                year: input.year,
              },
            },
            create: payload,
            update: payload,
          });
          promises.push(promise);
        }

        await Promise.all([
          ...promises,
          tx.campusSurveyLog.upsert({
            where: {
              campusId_variableOnFormGroupId: {
                campusId: input.campusId,
                variableOnFormGroupId: input.variableOnFormGroupId,
              },
            },
            create: {
              campusId: input.campusId,
              variableOnFormGroupId: input.variableOnFormGroupId,
              status: 'WAITING',
            },
            update: {
              campusId: input.campusId,
              variableOnFormGroupId: input.variableOnFormGroupId,
              status: 'WAITING',
            },
          }),
          tx.result.updateMany({
            where: {
              campusId: input.campusId,
              year: input.year,
            },
            data: {
              isApproved: false,
            },
          }),
          tx.resultVariable.updateMany({
            where: {
              variableId: input.variableId,
              campusId: input.campusId,
              year: input.year,
              userType: 'CAMPUS',
            },
            data: {
              isApproved: false,
            },
          }),
        ]);
      });

      return 'success';
    }),
});
