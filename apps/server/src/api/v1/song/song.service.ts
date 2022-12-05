import { Injectable } from '@nestjs/common'
import { PrismaTypes, PrismaService } from '@karaoke/db'

import { typesenseClient } from '../../../libs/typesense'

@Injectable()
export class SongService {
  constructor(private readonly db: PrismaService) {}

  async searchSongs(query: string) {
    const hits: any = await typesenseClient
      .collections('songs')
      .documents()
      .search({
        q: query,
        query_by: 'title, artist, artistRomanji, titleRomanji',
        per_page: 50,
        use_cache: true
      })
      .then((data) => data.hits)
    const songs = hits.map((hit) => hit.document)
    return songs
  }

  async searchSongsFallback(query: string) {
    const songs = await this.db.song.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            artist: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            artistRomanji: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            titleRomanji: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      },
      take: 50
    })

    return songs
  }
}
