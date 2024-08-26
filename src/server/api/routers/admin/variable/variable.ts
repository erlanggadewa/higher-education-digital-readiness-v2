import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { z } from '@/utils/id-zod';
import { AnswerStatus, SurveyLogStatus } from '@prisma/client';

export const adminVariableRouter = createTRPCRouter({
  getListVariables: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.variable.findMany();
  }),
});
