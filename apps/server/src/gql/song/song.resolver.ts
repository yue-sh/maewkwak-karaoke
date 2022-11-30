import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SongService } from './song.service'
import { Song } from './graphql/song.schema'

@Resolver()
export class SongResolver {
  constructor(private readonly service: SongService) {}

  @Query(() => [Song])
  async searchSongs(@Args('query') query: string) {
    return this.service.searchSongs(query)
  }
}
