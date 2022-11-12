import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { SERVER_HOST, SERVER_PORT } from '@karaoke/core'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
//
;(async function () {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bodyParser: true,
      cors: { origin: '*' }
    }
  )

  await app.listen(SERVER_PORT, SERVER_HOST)

  console.log(
    `\n\n Server is listening at http://${SERVER_HOST}:${SERVER_PORT} (@ ╯﹏╰)♡ \n\n`
  )
})()
