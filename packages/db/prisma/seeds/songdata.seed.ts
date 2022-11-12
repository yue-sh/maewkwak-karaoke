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

const available = cpus().length - 2
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

const data = (rawData as any).data

let counter = 0
if (isPrimary) {
  for (let i = 0; i < available; i++) {
    const worker = fork()
    worker.on('message', (msg) => {
      counter++
      if (counter == available) {
        process.exit(0)
      }
    })
  }
} else {
  // eslint-disable-next-line @typescript-eslint/no-extra-semi
  ;(async () => {
    await kuroshiro.init(new KuromojiAnalyzer())
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let { start, end } = batch(data.length, cluster.worker!.id)
    start -= 1
    end -= 1

    for (let i = start; i <= end; i++) {
      const song = data[i]

      if (!song) {
        continue
      }

      const romanji = await kuroshiro.convert(song.name || '', {
        to: 'romaji'
      })

      await Promise.allSettled([
        typesenseClient
          .collections('songs')
          .documents()
          .create({
            songId: song.numb || '',
            title: song.name || '',
            artist: song.star || '',
            romanji,
            alias: JSON.stringify([])
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.send(1)
  })()
}
