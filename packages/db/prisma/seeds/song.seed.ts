import fs from 'fs'
import Typesense from 'typesense'
import childProcess from 'child_process'
import {
  TYPESENSE_HOST,
  TYPESENSE_PORT,
  TYPESENSE_API_KEY,
  TYPESENSE_PROTOCOL,
  TYPESENSE_TIMEOUT
} from '@karaoke/core'

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
  const songSchema = {
    name: 'songs',
    fields: [
      { name: 'songId', type: 'string' },
      { name: 'title', type: 'string', facet: true },
      { name: 'artist', type: 'string', facet: true },
      { name: 'romanji', type: 'string', facet: true },
      { name: 'alias', type: 'string', facet: true }
    ]
  }
  try {
    console.log('🚣 Collection is re-indexing search data \n')
    await typesenseClient.collections('songs').delete()
    await typesenseClient.collections().create(songSchema as any)
  } catch {
    console.log('💀 Collection for indexing search does not exist, creating \n')
    await typesenseClient.collections().create(songSchema as any)
  }
  const numFiles = fs.readdirSync('./prisma/seeds/data').length - 1
  if (numFiles == 0) {
    throw new Error('No data file founded')
  }

  childProcess.execSync('ts-node ./prisma/seeds/songdata.seed.ts', {
    stdio: 'inherit'
  })
}
