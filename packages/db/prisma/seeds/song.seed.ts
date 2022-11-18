import fs from 'fs'
import { typesenseClient } from './utils'
import childProcess from 'child_process'

export async function seedSongs(): Promise<void> {
  const songSchema = {
    name: 'songs',
    fields: [
      { name: 'songId', type: 'string' },
      { name: 'title', type: 'string', facet: true },
      { name: 'artist', type: 'string', facet: true },
      { name: 'romanji', type: 'string', factet: true, optional: true },
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
