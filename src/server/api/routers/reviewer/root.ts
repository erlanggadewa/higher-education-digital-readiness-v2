import { createTRPCRouter } from '../../trpc';
import { reviewerCampusRouter } from './campus/campus';
import { reviewerDashboardRouter } from './dashboard';

export const reviewerRoot = createTRPCRouter({
  dashboard: reviewerDashboardRouter,
  campus: reviewerCampusRouter,
});
