import { randomUUID } from 'node:crypto';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import knex from '../database';
import env from '../env';

class UsersControllers {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const validateBodySchema = z.object({
      name: z.string(),
      password: z.string(),
      email: z.string(),
    });

    const { name, email, password } = validateBodySchema.parse(request.body);

    const user = await knex('users').select().where('email', email).first();
    if (user) {
      return reply.status(400).send({ message: 'Email already in use' });
    }

    const hashedPassword = await hash(password, 8);
    await knex('users').insert({
      id: randomUUID(),
      email,
      name,
      password: hashedPassword,
    });

    return reply.status(201).send();
  }

  async auth(request: FastifyRequest, reply: FastifyReply) {
    const validateBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = validateBodySchema.parse(request.body);

    const user = await knex('users').select().where('email', email).first();
    if (!user) {
      return reply.status(400).send({ message: 'Email or password invalid' });
    }

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      return reply.status(400).send({ message: 'Email or password invalid' });
    }

    const token = jwt.sign({ user_id: user.id }, env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 7, // 7days
    });

    reply.cookie('token', token, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return reply.status(204).send();
  }
}

export default UsersControllers;
