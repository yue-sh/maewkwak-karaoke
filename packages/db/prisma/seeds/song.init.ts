import Typesense from 'typesense'
import {
  TYPESENSE_HOST,
  TYPESENSE_PORT,
  TYPESENSE_API_KEY,
  TYPESENSE_PROTOCOL,
  TYPESENSE_TIMEOUT
} from '@karaoke/core'
import fs from 'fs'

export async function seedSongs(): Promise<void> {
  const typesenseClient = new Typesense.Client({
    nodes: [
      {
        host: TYPESENSE_HOST,
        port: +TYPESENSE_PORT,
        protocol: TYPESENSE_PROTOCOL
      }
    ],
    apiKey: TYPESENSE_API_KEY,
    connectionTimeoutSeconds: +TYPESENSE_TIMEOUT
  })
  const res = await typesenseClient.collections('songs').documents().export()
  fs.writeFileSync('./songs.json', res)
}

(async () => {
  await seedSongs()
})();