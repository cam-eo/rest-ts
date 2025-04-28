import { serve } from '@hono/node-server';
import { app } from './app.js';

const port = parseInt(process.env.PORT || '3000');

const server = serve({
  fetch: app.fetch,
  port
});

server.on('error', (error: Error) => {
  console.error('Server error:', error);
  process.exit(1);
});

console.log(`:check: Server is running on port ${port}`); 