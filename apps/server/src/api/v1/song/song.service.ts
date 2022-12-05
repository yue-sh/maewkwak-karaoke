import { Injectable } from '@nestjs/common'
import { PrismaTypes, PrismaService } from '@karaoke/db'

import { typesenseClient } from '../../../libs/typesense'

@Injectable()
export class SongService {
  constructor(private readonly db: PrismaService) {}

  async searchSongs(query: string) {
    const hits = await typesenseClient
      .collections('songs')
      .documents()
      .search({
        q: query,
        query_by: 'title, artist, artistRomanji, titleRomanji',
        per_page: 50,
        use_cache: true
      })
      .then((data) => data.hits)

    return [...hits.map((hit) => hit.document)]
  }

  async searchSongsFallback(query: string) {
    return await this.db.song.findMany({
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
  }
}
