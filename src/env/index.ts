import 'dotenv/config';
import { z } from 'zod';

const environmentVariablesSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_PATH: z.string(),
  JWT_SECRET: z.string(),
});

const env = environmentVariablesSchema.parse(process.env);

export default env;
