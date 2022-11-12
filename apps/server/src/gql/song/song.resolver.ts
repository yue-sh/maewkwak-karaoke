import { Resolver, Query, Mutation } from '@nestjs/graphql'
import { SongService } from './song.service'

@Resolver()
export class SongResolver {
  constructor(private readonly service: SongService) {}

  @Query(() => String)
  hello(): string {
    return 'world'
  }
}
