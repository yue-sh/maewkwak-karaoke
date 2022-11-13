import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SongService } from './song.service'
import { Song } from './graphql/song.schema'

@Resolver()
export class SongResolver {
  constructor(private readonly service: SongService) {}

  @Query(() => String)
  hello(): string {
    return 'world'
  }

  @Query(() => [Song])
  async searchSongs(@Args('name') name: string) {
    return this.service.searchSongs(name)
  }
}
