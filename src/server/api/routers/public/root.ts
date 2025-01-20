import { createTRPCRouter } from '../../trpc';
import { publicSurveyRouter } from './public-survey';

export const publicRoot = createTRPCRouter({
  publicSurvey: publicSurveyRouter,
});
