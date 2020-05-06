import * as Joi from '@hapi/joi'
import * as dotenv from 'dotenv'

export interface Config {
  server: {
    port: number
  }
  revolut: {
    privateKey: string
    clientId: string
    redirectUrl: string
    issuer: string
  }
}

const configSchema = Joi.object({
  server: Joi.object({
    port: Joi.number()
      .integer()
      .min(1)
      .max(65535)
      .default(3000),
  }).required(),
  revolut: Joi.object({
    privateKey: Joi.string()
      .base64()
      .required()
      .custom(
        value => Buffer.from(value, 'base64').toString('ascii'),
        'Base64 PEM'
      ),
    clientId: Joi.string().required(),
    redirectUrl: Joi.string()
      .uri()
      .required(),
    issuer: Joi.string().required(),
  }).required(),
}).required()

/**
 * Load the configuration from the environment.
 * Data will be validated and normalized from the env variables.
 */
export function loadConfig(): Config {
  const dotenvResult = dotenv.config()

  if (dotenvResult.error) {
    throw new Error('Cannot parse .env file')
  }

  const { value, error } = configSchema.validate({
    server: {},
    revolut: {
      privateKey: process.env.REVOLUT_PRIVATE_KEY,
      clientId: process.env.REVOLUT_CLIENT_ID,
      redirectUrl: process.env.REVOLUT_REDIRECT_URL,
      issuer: process.env.REVOLUT_ISSUER,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  return value
}
