import { loadConfig } from '../config'
import { loadServer } from './server'

/**
 * Initialize the application.
 */
export async function init() {
  const config = loadConfig()

  const app = loadServer(config)

  return { config, app }
}
