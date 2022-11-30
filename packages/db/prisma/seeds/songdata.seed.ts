import { cpus } from 'os'
import cluster from 'cluster'
import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'

import rawData from './data/data.json'
import { typesenseClient } from './utils'
import { PrismaClient } from '../../generated/client'

const db = new PrismaClient()
const { data } = rawData as any
const kuroshiro = new Kuroshiro()
const available = cpus().length - 1
const { isPrimary, fork } = cluster

function batch(total: number, batch: number) {
  const start = Math.floor(((batch - 1) * total) / available + 1)
  const end = Math.floor((batch * total) / available)
  return { start, end }
}

let counter = 0

if (isPrimary) {
  for (let i = 1; i < available; i++) {
    const worker = fork()
    worker.on('message', () => {
      counter++
      console.log(`${counter}/${available - 1} finished`)
      if (counter === available - 1) {
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

      let artistRomanji = ''
      let newArtistName = song.star.substring(1, song.star.length)
      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (
          !['|', ' '].includes(newArtistName.charAt(newArtistName.length - 1))
        ) {
          break
        }
        newArtistName = newArtistName.substring(0, newArtistName.length - 1)
      }
      const isArtistJapan = Kuroshiro.Util.isJapanese(newArtistName)
      if (isArtistJapan) {
        artistRomanji = await kuroshiro.convert(newArtistName, { to: 'romaji' })
      }

      let titleRomanji = ''
      const isTitleJapan = Kuroshiro.Util.isJapanese(song.name)
      if (isTitleJapan) {
        titleRomanji = await kuroshiro.convert(song.name, { to: 'romaji' })
      }

      await Promise.allSettled([
        typesenseClient.collections('songs').documents().create({
          songId: song.numb,
          artist: newArtistName,
          title: song.name,
          artistRomanji,
          titleRomanji
        }),
        db.song.create({
          data: {
            songId: song.numb,
            artist: newArtistName,
            title: song.name,
            ...(artistRomanji && { artistRomanji }),
            ...(titleRomanji && { titleRomanji })
          }
        })
      ])
    }
    ;(process as any).send(1)
  })()
}
