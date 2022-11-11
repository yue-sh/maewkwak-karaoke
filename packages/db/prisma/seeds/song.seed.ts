import fs from 'fs'
import Typesense from 'typesense'
import {
  TYPESENSE_HOST,
  TYPESENSE_PORT,
  TYPESENSE_API_KEY,
  TYPESENSE_PROTOCOL,
  TYPESENSE_TIMEOUT
} from '@karaoke/core'
import { PrismaClient } from '../../generated/client'

export async function seedSongs(db: PrismaClient): Promise<void> {
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
      { name: 'artist', type: 'string', facet: true }
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
  const rawData = fs.readFileSync('./prisma/seeds/data/data.json', 'utf-8')
  const { data } = JSON.parse(rawData)
  //! OPTIMIZE PLS uwu
  for (const song of data) {
    await typesenseClient.collections('songs').documents().create({
      songId: song.numb,
      title: song.name,
      artist: song.star
    })
    await db.song.create({
      data: {
        songId: song.numb,
        title: song.name,
        artist: song.star
      }
    })
  }
}
