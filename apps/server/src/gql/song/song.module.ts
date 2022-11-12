import { Module } from '@nestjs/common'
import { PrismaService } from '@karaoke/db'

import { SongResolver } from './song.resolver'
import { SongService } from './song.service'

@Module({
  providers: [SongResolver, SongService, PrismaService]
})
export class SongModule {}
