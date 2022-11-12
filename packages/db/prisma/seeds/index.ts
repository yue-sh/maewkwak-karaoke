import { cleanupDb } from './utils'
import { seedSongs } from './song.seed'
import { PrismaClient } from '../../generated/client'

const db = new PrismaClient()

;(async () => {
  console.log('\n\n 🧹 Cleaning up db... \n\n')
  await cleanupDb(db).then(async () => {
    await db.$disconnect()
  })

  console.log('\n\n Seeding songs... \n\n')
  await seedSongs().then(async () => {
    await db.$disconnect()
  })
})()
