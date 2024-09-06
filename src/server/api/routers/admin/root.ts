import { createTRPCRouter } from '../../trpc';
import { adminDashboardRouter } from './dashboard';
import { adminVariableRouter } from './variable';
import { adminCampusRouter } from './campus';
import { adminQuestionRouter } from './question';
import { adminFormGroupRouter } from './form-group';

export const adminRoot = createTRPCRouter({
  dashboard: adminDashboardRouter,
  variable: adminVariableRouter,
  campus: adminCampusRouter,
  question: adminQuestionRouter,
  formGroup: adminFormGroupRouter,
});
