import { Module } from '@nestjs/common'
import { PrismaService } from '@karaoke/db'

import { SongController } from './song.controller'
import { SongResolver } from './graphql/song.resolver'
import { SongService } from './song.service'

@Module({
  controllers: [SongController],
  providers: [SongResolver, SongService, PrismaService]
})
export class SongModule {}
