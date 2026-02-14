#!/usr/bin/env tsx

/**
 * Neon Database Connection Setup Guide
 * 
 * This script helps you configure the correct connection string for Neon.
 * 
 * Neon provides TWO types of connection strings:
 * 1. Pooled connection (recommended for serverless/Next.js)
 * 2. Direct connection (required for Prisma Migrate)
 */

console.log(`
╔═══════════════════════════════════════════════════════════╗
║         NEON DATABASE CONNECTION SETUP GUIDE              ║
╚═══════════════════════════════════════════════════════════╝

📋 INSTRUCTIONS:

1. Go to your Neon dashboard: https://console.neon.tech

2. Select your project: ep-misty-sky-aipqvyz6

3. You'll see TWO connection strings:

   a) 📦 POOLED CONNECTION (for application/serverless):
      postgresql://...@ep-misty-sky-aipqvyz6-pooler.c-4.us-east-1.aws.neon.tech/...
                                                    ^^^^^^ NOTE: "-pooler" suffix

   b) 🔗 DIRECT CONNECTION (for Prisma migrations/push):
      postgresql://...@ep-misty-sky-aipqvyz6.c-4.us-east-1.aws.neon.tech/...
                                                    NO "-pooler" suffix

4. For Prisma db:push to work, you need the DIRECT connection string.

🔧 CURRENT CONNECTION STRING:
   ${process.env.DATABASE_URL}

❓ IS THIS CORRECT?

   ✅ If it contains "-pooler" → You're using pooled connection
   ⚠️  For Prisma db:push, you need the DIRECT connection (without "-pooler")

🎯 SOLUTION:

   Option 1: Use DIRECT connection for migrations
   ────────────────────────────────────────────
   In your .env file:
   DATABASE_URL="postgresql://user:pass@ep-misty-sky...neon.tech/db?sslmode=require"
                                                    ^^ NO -pooler

   Option 2: Use separate URLs (recommended for production)
   ─────────────────────────────────────────────────────────
   # For Prisma migrations
   DATABASE_URL="postgresql://...@ep-misty-sky-aipqvyz6.c-4.us-east-1.aws.neon.tech/..."
   
   # For application (in production with Vercel/serverless)
   DATABASE_URL_POOLED="postgresql://...@ep-misty-sky-aipqvyz6-pooler.c-4.us-east-1.aws.neon.tech/..."

📚 NEXT STEPS:

   1. Go to Neon dashboard and copy the DIRECT connection string
   2. Update your .env file with the direct connection
   3. Run: npm run db:push
   4. (Optional) After setup, you can switch to pooled for production

🔗 More info: https://neon.tech/docs/connect/connection-pooling
`);

// Test current connection
import { Client } from 'pg';

async function testCurrentConnection() {
  console.log('\n🧪 Testing your current DATABASE_URL...\n');
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const result = await client.query('SELECT version()');
    console.log('✅ Connection successful!');
    console.log(`   PostgreSQL: ${result.rows[0].version.split(' ').slice(0, 2).join(' ')}\n`);
    
    const pooled = process.env.DATABASE_URL?.includes('-pooler') ? 'POOLED' : 'DIRECT';
    console.log(`📌 Connection type: ${pooled}`);
    
    if (pooled === 'POOLED') {
      console.log('\n⚠️  WARNING: You\'re using a pooled connection.');
      console.log('   Prisma db:push might fail with pooled connections.');
      console.log('   Please use the DIRECT connection string from Neon dashboard.\n');
    } else {
      console.log('\n✅ Good! You\'re using a direct connection.');
      console.log('   This should work with Prisma db:push.\n');
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error instanceof Error ? error.message : 'Unknown error');
  } finally {
    await client.end();
  }
}

testCurrentConnection();
