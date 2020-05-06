import * as express from 'express'
import { Config } from '../config'
import { createRouter } from '../router'

/**
 * Load and setup the express server.
 *
 * @param config The app config
 */
export async function loadServer(config: Config) {
  const app = express()

  const router = createRouter(config)

  app.use(router)

  await new Promise((resolve, reject) => {
    app
      .listen(config.server.port, () => {
        resolve()
      })
      .on('error', function(err) {
        reject(err.message)
      })
  })

  return app
}
