import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const globalForDb = globalThis as unknown as {
  client: ReturnType<typeof postgres> | undefined
}

// Create postgres connection
const client = globalForDb.client ?? postgres(process.env.DATABASE_URL!, {
  max: 1,
})

if (process.env.NODE_ENV !== 'production') {
  globalForDb.client = client
}

// Export db instance
export const db = drizzle(client, { schema })
