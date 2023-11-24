import { FastifyInstance } from 'fastify';
import ensureAuth from '../middlewares/ensureAuth';
import MealsControllers from '../controllers/MealsControllers';

const mealsControllers = new MealsControllers();

async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', ensureAuth);
  app.get('/', mealsControllers.index);
  app.get('/:id', mealsControllers.show);
  app.post('/', mealsControllers.create);
  app.put('/:id', mealsControllers.update);
  app.delete('/:id', mealsControllers.delete);
}

export default mealsRoutes;
