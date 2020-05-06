import got from 'got'
import * as jwt from 'jsonwebtoken'
import { Config } from '../config'

/**
 * Sign a JWT using the private key for Revolut client assertion.
 *
 * @param config The app config
 */
function signJwt(config: Config) {
  const payload = {
    iss: config.revolut.issuer,
    sub: config.revolut.clientId,
    aud: 'https://revolut.com',
  }

  return jwt.sign(payload, config.revolut.privateKey, {
    algorithm: 'RS256',
    expiresIn: 60 * 60,
  })
}

/**
 * Exchange an auth code against an access token.
 *
 * @param config The app config
 * @param authCode The auth code to exchange
 */
export async function getAccessToken(config: Config, authCode: string) {
  const jwt = signJwt(config)

  /* eslint-disable @typescript-eslint/camelcase */
  const res = await got.post<{ access_token: string }>(
    'https://sandbox-b2b.revolut.com/api/1.0/auth/token',
    {
      form: {
        grant_type: 'authorization_code',
        code: authCode,
        client_id: config.revolut.clientId,
        client_assertion_type:
          'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        client_assertion: jwt,
      },
      responseType: 'json',
    }
  )
  /* eslint-enable @typescript-eslint/camelcase */

  return res.body.access_token
}
