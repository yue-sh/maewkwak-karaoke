import { cpus } from 'os'
import cluster from 'cluster'
import Kuroshiro from 'kuroshiro'
import Typesense from 'typesense'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
import {
  TYPESENSE_HOST,
  TYPESENSE_PORT,
  TYPESENSE_API_KEY,
  TYPESENSE_PROTOCOL,
  TYPESENSE_TIMEOUT
} from '@karaoke/core'
import rawData from './data/data.json'
import { PrismaClient } from '../../generated/client'

const db = new PrismaClient()

function batch(total: number, batch: number) {
  const start = Math.floor(((batch - 1) * total) / available + 1)
  const end = Math.floor((batch * total) / available)
  return { start, end }
}

const available = cpus().length - 1
const kuroshiro = new Kuroshiro()
const { isPrimary, fork } = cluster

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

const { data } = rawData as any

let counter = 0
if (isPrimary) {
  for (let i = 0; i < available; i++) {
    const worker = fork()
    worker.on('message', () => {
      counter++
      console.log(`${counter}/${available} finished`)
      if (counter == available) {
        process.exit(0)
      }
    })
  }
} else {
  ;(async () => {
    await kuroshiro.init(new KuromojiAnalyzer())
    let { start, end } = batch(data.length, cluster.worker!.id)
    start -= 1
    end -= 1

    for (let i = start; i <= end; i++) {
      const song = data[i]

      if (!song) {
        continue
      }
      let romanji = ''
      const isJapan = Kuroshiro.Util.isJapanese(song.name)
      if (isJapan) {
        romanji = await kuroshiro.convert(song.name, {
          to: 'romaji'
        })
      }

      await Promise.allSettled([
        typesenseClient.collections('songs').documents().create({
          songId: song.numb,
          title: song.name,
          artist: song.star,
          romanji,
          alias: ''
        }),
        db.song.create({
          data: {
            songId: song.numb,
            title: song.name,
            artist: song.star,
            romanji
          }
        })
      ])
    }
    ;(process as any).send(1)
  })()
}
