import { createTRPCRouter } from '../../trpc';
import { adminDashboardRouter } from './dashboard';
import { adminVariableRouter } from './variable/variable';

export const adminRoot = createTRPCRouter({
  dashboard: adminDashboardRouter,
  variable: adminVariableRouter,
});
