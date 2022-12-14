import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SongService } from '../song.service'
import { Song } from './song.schema'

@Resolver()
export class SongResolver {
  constructor(private readonly service: SongService) {}

  @Query(() => [Song])
  searchSongs(@Args('query') query: string) {
    return this.service.searchSongs(query)
  }

  @Query(() => [Song])
  searchSongsFallback(@Args('query') query: string) {
    return this.service.searchSongsFallback(query)
  }
}
