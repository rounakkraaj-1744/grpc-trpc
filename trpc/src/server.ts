import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const t = initTRPC.create();

const appRouter = t.router({
  hello: t.procedure.query(() => 'Hello! This is tRPC'),
});

createHTTPServer({
  router: appRouter,
  createContext: () => ({}),
}).listen(3000);

export type AppRouter = typeof appRouter;
