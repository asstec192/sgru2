import env from '#start/env'
import { PrismaClient } from '@prisma/client'

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.get('NODE_ENV') === 'development'
        ? ['query', 'error', 'warn', 'info']
        : ['error', 'info'],
  })

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

export type prisma = typeof prisma

if (env.get('NODE_ENV') !== 'production') globalForPrisma.prisma = prisma
