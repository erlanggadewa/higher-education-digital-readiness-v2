import { createTRPCRouter } from '../../trpc';
import { campusSurveyRouter } from './campus-survey';
import { campusDashboardRouter } from './dashboard';
import { publicSurveyRouter } from './public-survey';

export const campusRoot = createTRPCRouter({
  dashboard: campusDashboardRouter,
  campusSurvey: campusSurveyRouter,
  publicSurvey: publicSurveyRouter,
});
