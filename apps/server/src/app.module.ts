import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius'

import { SongModule } from './api/v1/song/song.module'

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      cache: true,
      path: '/api/v1/song/graphql',
      autoSchemaFile: true,
      driver: MercuriusDriver,
      context: (req: FastifyRequest, res: FastifyReply) => ({
        req,
        res
      })
    }),
    SongModule
  ]
})
export class AppModule {}
