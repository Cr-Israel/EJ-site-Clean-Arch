import { config } from 'dotenv'

import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

import { getPrismaClient, resetPrismaClient } from '@/infra/database/prisma-config'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const prisma = getPrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)
  console.log("Using schema ID:", schemaId);

  process.env.DATABASE_URL = databaseURL

  await resetPrismaClient();
  await prisma.$connect()
  
  execSync('yarn prisma migrate deploy')

  console.log('Prisma connected successfully.');
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})