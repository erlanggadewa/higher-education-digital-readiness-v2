import { createTRPCRouter } from '../../trpc';
import { campusSurveyRouter } from './campus-survey';
import { campusDashboardRouter } from './dashboard';

export const campusRoot = createTRPCRouter({
  dashboard: campusDashboardRouter,
  campusSurvey: campusSurveyRouter,
});
