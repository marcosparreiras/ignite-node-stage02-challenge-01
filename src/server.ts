import fastify from 'fastify';
import cookie from '@fastify/cookie';
import env from './env';
import usersRoutes from './routes/user.routes';
import mealsRoutes from './routes/meals.routes';
import summaryRoutes from './routes/summary.routes';

const app = fastify();

app.register(cookie);
app.register(usersRoutes, { prefix: 'users' });
app.register(mealsRoutes, { prefix: 'meals' });
app.register(summaryRoutes, { prefix: 'summary' });

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP server is running on port ${env.PORT}`);
});
