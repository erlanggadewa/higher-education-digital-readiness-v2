import { createTRPCRouter } from '../../trpc';
import { postRouter } from './post';

export const exampleRoot = createTRPCRouter({
  example: postRouter,
});
