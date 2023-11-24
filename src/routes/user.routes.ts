import { FastifyInstance } from 'fastify';
import UsersControllers from '../controllers/UsersControllers';
import ensureAuth from '../middlewares/ensureAuth';

const usersContollers = new UsersControllers();
async function usersRoutes(app: FastifyInstance) {
  app.post('/', usersContollers.create);
  app.post('/auth', usersContollers.auth);
}

export default usersRoutes;
