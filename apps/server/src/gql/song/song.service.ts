import { Injectable } from '@nestjs/common'
import { PrismaTypes, PrismaService } from '@karaoke/db'

@Injectable()
export class SongService {
  constructor(private readonly db: PrismaService) {}
}
