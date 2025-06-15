import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;

  ALUMNOS_SERVICE_HOST: string;
  ALUMNOS_SERVICE_PORT: number;
}

const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),

    ALUMNOS_SERVICE_HOST: joi.string().required(),
    ALUMNOS_SERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const validatedEnvs = envsSchema.validate(process.env, {
  abortEarly: false,
});

if (validatedEnvs.error) {
  throw new Error(`Config validation error: ${validatedEnvs.error.message}`);
}

const envVars = validatedEnvs.value;

export const envs = {
  port: envVars.PORT,

  alumnosServiceHost: envVars.ALUMNOS_SERVICE_HOST,
  alumnosServicePort: envVars.ALUMNOS_SERVICE_PORT,
};
