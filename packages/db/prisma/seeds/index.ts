import { cleanupDb } from './utils'
import { PrismaClient } from '../../generated/client'

const db = new PrismaClient()

;(async () => {
  console.log('\n\n 🧹 Cleaning up db... \n\n')
  await cleanupDb(db).then(async () => {
    await db.$disconnect()
  })
})()
