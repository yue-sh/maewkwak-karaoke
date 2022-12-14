import Typesense from 'typesense'
import {
  TYPESENSE_HOST,
  TYPESENSE_PORT,
  TYPESENSE_API_KEY,
  TYPESENSE_PROTOCOL,
  TYPESENSE_TIMEOUT
} from '@karaoke/core'

export async function cleanupDb(db): Promise<void> {
  const tablenames = await db.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='karaoke'`

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        const result = await db.$executeRawUnsafe(
          `TRUNCATE TABLE "karaoke"."${tablename}" CASCADE;`
        )
        console.log(`Cleanup table : ${tablename}`, result)
      } catch (error) {
        console.log('Clean up error: ', error)
      }
    }
  }
}

export const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: TYPESENSE_HOST,
      port: +TYPESENSE_PORT,
      protocol: TYPESENSE_PROTOCOL
    }
  ],
  apiKey: TYPESENSE_API_KEY,
  connectionTimeoutSeconds: +TYPESENSE_TIMEOUT
})
