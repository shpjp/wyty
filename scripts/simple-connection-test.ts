#!/usr/bin/env tsx

import { Client } from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Simple PostgreSQL Connection Test
 * Uses native pg client to test connection without Prisma
 */
async function testSimpleConnection() {
  console.log('🔍 Testing PostgreSQL connection (without Prisma)...\n');

  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  console.log('Connection string format:', connectionString.replace(/:[^:@]+@/, ':****@'));
  console.log('');

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false, // Neon requires SSL
    },
  });

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    console.log('Running test query...');
    const result = await client.query('SELECT NOW() as current_time, version() as version');
    console.log('✅ Query result:');
    console.log(result.rows[0]);
    console.log('');

    console.log('✅ Connection test successful!');
    console.log('🎉 Your Neon database is accessible');

  } catch (error) {
    console.error('\n❌ Connection failed:');
    if (error instanceof Error) {
      console.error(`   ${error.message}`);
    }
    console.error('\n🔧 Common fixes:');
    console.error('   1. Verify DATABASE_URL is correct in .env');
    console.error('   2. Check if database is active in Neon dashboard');
    console.error('   3. Ensure ?sslmode=require is in connection string');
    console.error('   4. Try regenerating database password in Neon');
    process.exit(1);
  } finally {
    await client.end();
  }
}

testSimpleConnection();
