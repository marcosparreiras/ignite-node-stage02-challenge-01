import { FastifyInstance } from 'fastify';
import SummaryControllers from '../controllers/SummaryControllers';
import ensureAuth from '../middlewares/ensureAuth';

const summaryControllers = new SummaryControllers();

async function summaryRoutes(app: FastifyInstance) {
  app.addHook('preHandler', ensureAuth);
  app.get('/', summaryControllers.index);
}

export default summaryRoutes;
