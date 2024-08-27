import { createTRPCRouter } from '../../trpc';
import { campusDashboardRouter } from './dashboard';

export const campusRoot = createTRPCRouter({
  dashboard: campusDashboardRouter,
});
