import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Song {
  @Field(() => ID)
  songId: string

  @Field(() => String)
  artist: string

  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  artistRomanji?: string

  @Field(() => String, { nullable: true })
  titleRomanji?: string
}
