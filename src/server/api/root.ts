import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc';
import { adminRoot } from './routers/admin/root';
import { campusRoot } from './routers/campus/root';
import { publicRoot } from './routers/public/root';
import { reviewerRoot } from './routers/reviewer/root';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRoot,
  reviewer: reviewerRoot,
  campus: campusRoot,
  public: publicRoot,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
