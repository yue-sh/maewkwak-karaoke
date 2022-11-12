import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { FastifyRequest, FastifyReply } from 'fastify'
import { NoSchemaIntrospectionCustomRule } from 'graphql'
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius'
import { isDevelopment } from '@karaoke/core'

import { SongModule } from './gql/song/song.module'

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      cache: true,
      path: '/graphql',
      autoSchemaFile: true,
      driver: MercuriusDriver,
      context: (req: FastifyRequest, res: FastifyReply) => ({
        req,
        res
      }),
      validationRules: !isDevelopment && [NoSchemaIntrospectionCustomRule]
    }),
    SongModule
  ]
})
export class AppModule {}
