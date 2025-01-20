import { createTRPCRouter } from '../../trpc';
import { adminDashboardRouter } from './dashboard';
import { adminVariableRouter } from './variable';
import { adminCampusRouter } from './campus';
import { adminQuestionRouter } from './question';
import { adminFormGroupRouter } from './form-group';
import {adminLevelRouter} from "@/server/api/routers/admin/level";
import {adminUserRouter} from "@/server/api/routers/admin/user";

export const adminRoot = createTRPCRouter({
  dashboard: adminDashboardRouter,
  variable: adminVariableRouter,
  campus: adminCampusRouter,
  question: adminQuestionRouter,
  formGroup: adminFormGroupRouter,
  level: adminLevelRouter,
  user: adminUserRouter,
});
