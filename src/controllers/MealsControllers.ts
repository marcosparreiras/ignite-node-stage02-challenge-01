import { randomUUID } from 'node:crypto';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import knex from '../database';

class MealsControllers {
  async index(request: FastifyRequest, reply: FastifyReply) {
    const { user_id } = request;

    const meals = await knex('meals').select('*').where('user_id', user_id);

    return reply.status(200).send({ meals });
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const validateRquestParams = z.object({
      id: z.string(),
    });

    const { id } = validateRquestParams.parse(request.params);
    const { user_id } = request;

    const meal = await knex('meals').select('*').where({ id, user_id }).first();
    if (!meal) {
      return reply
        .status(400)
        .send({ status: 'error', message: 'Meal not found' });
    }
    return reply.status(200).send({ meal });
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const validateBodySchema = z.object({
      name: z.string(),
      on_diet: z.boolean(),
      description: z.string().default(''),
    });

    const { name, on_diet, description } = validateBodySchema.parse(
      request.body
    );

    await knex('meals').insert({
      id: randomUUID(),
      name,
      on_diet,
      description,
      user_id: request.user_id,
    });

    return reply.status(201).send();
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const validateRquestParams = z.object({
      id: z.string(),
    });
    const validateBodySchema = z.object({
      name: z.string(),
      on_diet: z.boolean(),
      description: z.string().default(''),
    });

    const { id } = validateRquestParams.parse(request.params);
    const { user_id } = request;
    const { name, on_diet, description } = validateBodySchema.parse(
      request.body
    );

    const meal = await knex('meals').select('*').where({ id, user_id }).first();
    if (!meal) {
      return reply
        .status(400)
        .send({ status: 'error', message: 'Meal not found' });
    }

    await knex('meals').where('id', id).update({ name, on_diet, description });

    return reply.status(202).send();
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const validateRquestParams = z.object({
      id: z.string(),
    });

    const { id } = validateRquestParams.parse(request.params);
    const { user_id } = request;

    const meal = await knex('meals').select('*').where({ id, user_id }).first();
    if (!meal) {
      return reply
        .status(400)
        .send({ status: 'error', message: 'Meal not found' });
    }

    await knex('meals').delete().where('id', id);

    return reply.status(204).send();
  }
}

export default MealsControllers;
