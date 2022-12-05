import { FastifyRequest, FastifyReply } from 'fastify'
import { Controller, Get, Post, Req, Res } from '@nestjs/common'

import { SongService } from './song.service'

@Controller('/api/v1/song')
export class SongController {
  constructor(private readonly service: SongService) {}

  @Get('/search')
  async searchSongs(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const query = (req as any).query.q as string
      const reply = await this.service.searchSongs(query)
      return res.status(200).send(reply)
    } catch {
      return res.status(500).send('Internal server error')
    }
  }

  @Get('/search/fallback')
  async searchSongsFallback(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply
  ) {
    try {
      const query = (req as any).query.q as string
      const reply = await this.service.searchSongsFallback(query)
      return res.status(200).send(reply)
    } catch {
      return res.status(500).send('Internal server error')
    }
  }
}
