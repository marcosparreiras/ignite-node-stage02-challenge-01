import type { Knex } from 'knex';
import env from './src/env';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: env.DATABASE_PATH,
    },
    migrations: {
      extension: 'ts',
      directory: './db/migrations',
    },
    pool: {
      afterCreate: (conn: any, cb: () => any) =>
        conn.run('PRAGMA foreign_keys = ON', cb),
    },
    useNullAsDefault: true,
  },
};

export default config;
