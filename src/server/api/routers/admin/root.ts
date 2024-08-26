import { createTRPCRouter } from '../../trpc';
import { dashboardRouter } from './dashboard';

export const adminRoot = createTRPCRouter({
  dashboard: dashboardRouter,
});
