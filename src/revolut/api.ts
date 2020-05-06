import got from 'got'

/**
 * Get the accounts of the user.
 *
 * @param accessToken A valid access token
 */
export async function getAccounts(accessToken: string) {
  const client = got.extend({
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  const res = await client.get(
    'https://sandbox-b2b.revolut.com/api/1.0/accounts',
    { responseType: 'json' }
  )

  return res.body
}
