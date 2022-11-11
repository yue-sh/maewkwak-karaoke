import fs from 'fs'
import Typesense from 'typesense'
import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
import {
  TYPESENSE_HOST,
  TYPESENSE_PORT,
  TYPESENSE_API_KEY,
  TYPESENSE_PROTOCOL,
  TYPESENSE_TIMEOUT
} from '@karaoke/core'
import { PrismaClient } from '../../generated/client'

export async function seedSongs(db: PrismaClient): Promise<void> {
  const kuroshiro = new Kuroshiro()
  await kuroshiro.init(new KuromojiAnalyzer())
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
  const rawData = fs.readFileSync('./prisma/seeds/data/data.json', 'utf-8')
  const { total, data } = JSON.parse(rawData)
  let now = 0
  //! OPTIMIZE PLS uwu
  for (const song of data) {
    const romanji = await kuroshiro.convert(song.name, {
      to: 'romaji'
    })
    //? Index default without alias
    await typesenseClient.collections('songs').documents().create({
      songId: song.numb,
      title: song.name,
      artist: song.star,
      romanji,
      alias: ''
    })
    //? Index
    await db.song.create({
      data: {
        songId: song.numb,
        title: song.name,
        artist: song.star
      }
    })
    console.log(`Indexing ${now++} of ${total} songs`)
  }
}
