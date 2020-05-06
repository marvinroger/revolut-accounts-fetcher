import * as express from 'express'
import { Config } from './config'
import * as revolutService from './services/revolut'

/**
 * Create the router that will be used by the server loader.
 *
 * @param config The app config
 */
export function createRouter(config: Config) {
  const router = express.Router()

  router.get('/authorize', (_req, res) => {
    const { clientId, redirectUrl } = config.revolut

    return res.redirect(
      `https://sandbox-business.revolut.com/app-confirm?client_id=${clientId}&redirect_uri=${redirectUrl}`
    )
  })

  router.get('/auth_response', async (req, res) => {
    const { code }: { code?: string } = req.query

    if (!code) {
      return res.send('Could not get auth code')
    }

    try {
      const data = await revolutService.getUserAccounts(config, code)

      return res.send(data)
    } catch (err) {
      return res.status(500).send('Could not authenticate you')
    }
  })

  return router
}
