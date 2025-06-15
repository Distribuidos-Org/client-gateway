import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const validatedEnvs = envsSchema.validate(
  {
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
  },
  {
    abortEarly: false,
  },
);

if (validatedEnvs.error) {
  throw new Error(`Config validation error: ${validatedEnvs.error.message}`);
}

const envVars = validatedEnvs.value;

export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
};
