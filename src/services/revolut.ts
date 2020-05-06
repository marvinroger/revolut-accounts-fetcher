import { Config } from '../config'
import { getAccounts } from '../revolut/api'
import { getAccessToken } from '../revolut/auth'

/**
 * Get user accounts using an auth code.
 *
 * @param config The app config
 * @param authCode A fresh, valid auth code
 */
export async function getUserAccounts(config: Config, authCode: string) {
  const accessToken = await getAccessToken(config, authCode)
  const accounts = await getAccounts(accessToken)

  return `<pre>Here are your accounts:\n\n${JSON.stringify(
    accounts,
    null,
    2
  )}</pre>`
}
