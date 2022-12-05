import { ObjectType, Field, ID } from '@nestjs/graphql'
import { DateTimeResolver as DateTimeResolverV2 } from 'graphql-scalars'

DateTimeResolverV2.name = 'DateTimeResolverV2'

@ObjectType()
export class Song {
  @Field(() => ID)
  id: string

  @Field(() => ID)
  songId: string

  @Field(() => String)
  artist: string

  @Field(() => String)
  title: string

  @Field(() => String)
  artistRomanji: string

  @Field(() => String)
  titleRomanji: string

  @Field(() => DateTimeResolverV2)
  createdAt: Date

  @Field(() => DateTimeResolverV2)
  updatedAt: Date
}
