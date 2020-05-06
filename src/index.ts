import * as open from 'open'
import { init } from './loaders'

async function main() {
  const { config } = await init()

  const authorizeUrl = `http://127.0.0.1:${config.server.port}/authorize`

  open(authorizeUrl)
  console.log(`Please allow access to your account on ${authorizeUrl}`)
}

main().catch(err => {
  process.exitCode = 1
  console.log('An unexpected error occured', err)
})
