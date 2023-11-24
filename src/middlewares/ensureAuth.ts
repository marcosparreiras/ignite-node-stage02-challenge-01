import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import env from '../env';
import knex from '../database';

async function ensureAuth(request: FastifyRequest, reply: FastifyReply) {
  const token = request.cookies.token;
  if (!token) {
    return reply.status(400).send({ message: 'Token is missing' });
  }
  const tokenData = jwt.verify(token, env.JWT_SECRET);
  const validateTokenDataSchema = z.object({
    user_id: z.string(),
  });
  const { user_id } = validateTokenDataSchema.parse(tokenData);
  const user = await knex('users').select('*').where('id', user_id).first();
  if (!user) {
    return reply.status(400).send({ status: 'error', message: 'Unauthorized' });
  }
  request.user_id = user_id;
}

export default ensureAuth;
