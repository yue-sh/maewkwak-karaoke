import { Prisma as PrismaTypes, PrismaClient } from '../generated/client'
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'

@Injectable()
class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}

export { PrismaTypes, PrismaService, PrismaClient }
