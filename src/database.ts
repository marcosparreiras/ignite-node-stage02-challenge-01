import { knex as knexInit } from 'knex';
import config from '../knexfile';

const knex = knexInit(config.development);

export default knex;
