import { Injectable } from '@nestjs/common'
import { PrismaTypes, PrismaService } from '@karaoke/db'

import { typesenseClient } from '../../libs/typesense'

@Injectable()
export class SongService {
  constructor(private readonly db: PrismaService) {}

  async searchSongs(name: string) {
    const hits: any = await typesenseClient
      .collections('songs')
      .documents()
      .search({
        q: name,
        query_by: 'title, artist, romanji, alias',
        per_page: 20,
        use_cache: true
      })
      .then((data) => data.hits)

    const songs = hits.map((hit) => hit.document)
    return songs
  }
}
