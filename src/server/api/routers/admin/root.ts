import { createTRPCRouter } from '../../trpc';
import { adminDashboardRouter } from './dashboard';
import { adminVariableRouter } from './variable';
import { adminCampusRouter } from './campus';

export const adminRoot = createTRPCRouter({
  dashboard: adminDashboardRouter,
  variable: adminVariableRouter,
  campus: adminCampusRouter,
});
