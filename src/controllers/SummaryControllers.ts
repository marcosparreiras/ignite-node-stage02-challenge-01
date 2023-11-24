import { FastifyReply, FastifyRequest } from 'fastify';
import knex from '../database';
import getBiggestSequence from '../utils/getBiggestSequence';

class SummaryControllers {
  async index(request: FastifyRequest, reply: FastifyReply) {
    const { user_id } = request;

    const meals = await knex('meals')
      .select('*')
      .where('user_id', user_id)
      .orderBy('created_at', 'asc');

    const total = meals.length;

    const total_on_diet = meals.filter((meal) => meal.on_diet == true).length;

    const total_out_diet = total - total_on_diet;

    const diet_sequence = meals.map((meal) => meal.on_diet);
    const best_diet_sequence = getBiggestSequence(diet_sequence);

    return reply
      .status(200)
      .send({ total, total_on_diet, total_out_diet, best_diet_sequence });
  }
}

export default SummaryControllers;
